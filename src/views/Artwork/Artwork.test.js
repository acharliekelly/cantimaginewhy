import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ArtworkPage from './index';
import { fetchGallery } from '../../utils/cloudinaryApi';
import { initializeLibrary } from '../../utils/faLibrary';

jest.mock('../../utils/cloudinaryApi', () => ({
  ...jest.requireActual('../../utils/cloudinaryApi'),
  fetchGallery: jest.fn()
}));
jest.mock('axios', () => jest.fn());
jest.mock('react-socks', () => ({ Breakpoint: () => null }));
jest.mock('cloudinary-react', () => ({
  Image: () => null,
  Transformation: () => null
}));

let container;

beforeAll(initializeLibrary);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => { ReactDOM.render(<ArtworkPage />, container); });
});

afterEach(() => {
  act(() => { ReactDOM.unmountComponentAtNode(container); });
  container.remove();
  fetchGallery.mockReset();
});

const button = name => Array.from(container.querySelectorAll('button'))
  .find(element => element.textContent.includes(name));

it('shows album covers before fetching and returns to them from a gallery', async () => {
  expect(fetchGallery).not.toHaveBeenCalled();
  expect(button('Plein Air')).toBeDefined();
  fetchGallery.mockResolvedValue([]);

  await act(async () => { button('Plein Air').click(); });
  expect(fetchGallery).toHaveBeenCalledWith('plein-air-acrylic');
  expect(container.querySelector('.album-overview')).toBeNull();

  act(() => { button('All albums').click(); });
  expect(button('Plein Air')).toBeDefined();
});

it('keeps the overview available when an album fails to load', async () => {
  fetchGallery.mockRejectedValue(new Error('Offline'));

  await act(async () => { button('Plein Air').click(); });

  expect(container.querySelector('[role="alert"]').textContent).toContain('Plein Air');
  expect(button('Plein Air').disabled).toBe(false);
});

it('ignores an earlier album response after a newer selection', async () => {
  let finishFirstRequest;
  fetchGallery
    .mockImplementationOnce(() => new Promise(resolve => { finishFirstRequest = resolve; }))
    .mockResolvedValueOnce([]);

  act(() => { button('Plein Air').click(); });
  expect(container.querySelector('[role="status"]').textContent).toContain('Loading Plein Air');

  await act(async () => { button('Scenery').click(); });
  await act(async () => { finishFirstRequest([]); });
  expect(container.querySelector('[role="status"]').textContent).toContain('Scenery');
});

it('opens a filtered gallery from the overview without a React breakpoint', async () => {
  act(() => { button('Browse by filter').click(); });
  expect(button('Subject')).toBeDefined();
  fetchGallery.mockResolvedValue([]);
  await act(async () => { button('Places').click(); });
  expect(fetchGallery).toHaveBeenCalledWith('subj-place');
});
