import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, useHistory } from 'react-router-dom';
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
  Image: ({ publicId, ...props }) => {
    const { alt, className, onClick, title } = props;
    return <img alt={alt || ""} className={className} onClick={onClick} title={title} data-public-id={publicId} />;
  },
  Transformation: () => null
}));

let container;
let history;

function TestPage() {
  history = useHistory();
  return <ArtworkPage />;
}

function renderAt(pathname) {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(
      <MemoryRouter initialEntries={[pathname]}><TestPage /></MemoryRouter>,
      container
    );
  });
}

beforeAll(initializeLibrary);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  renderAt('/artwork');
});

afterEach(() => {
  act(() => { ReactDOM.unmountComponentAtNode(container); });
  container.remove();
  fetchGallery.mockReset();
});

const link = name => Array.from(container.querySelectorAll('a'))
  .find(element => element.textContent.includes(name));

const button = name => Array.from(container.querySelectorAll('button'))
  .find(element => element.textContent.includes(name));

it('shows album covers before fetching and returns to them from a gallery', async () => {
  expect(fetchGallery).not.toHaveBeenCalled();
  expect(link('Plein Air').getAttribute('href')).toBe('/artwork/album/plein-air-acrylic');
  fetchGallery.mockResolvedValue([]);

  await act(async () => { link('Plein Air').click(); });
  expect(fetchGallery).toHaveBeenCalledWith('plein-air-acrylic');
  expect(container.querySelector('.album-overview')).toBeNull();

  act(() => { link('All albums').click(); });
  expect(container.querySelector('.album-overview')).not.toBeNull();
});

it('loads a direct album link and follows Back and Forward', async () => {
  fetchGallery.mockResolvedValue([]);

  renderAt('/artwork/album/plein-air-acrylic');
  await act(async () => {});
  expect(link('Plein Air').getAttribute('aria-current')).toBe('page');

  await act(async () => { link('Scenery').click(); });
  expect(fetchGallery).toHaveBeenLastCalledWith('scenery-loc');

  await act(async () => { history.goBack(); });
  expect(fetchGallery).toHaveBeenLastCalledWith('plein-air-acrylic');

  await act(async () => { history.goForward(); });
  expect(fetchGallery).toHaveBeenLastCalledWith('scenery-loc');
});

it('retries a failed album without leaving its URL', async () => {
  fetchGallery.mockRejectedValueOnce(new Error('Offline')).mockResolvedValueOnce([]);

  await act(async () => { link('Plein Air').click(); });
  expect(container.querySelector('[role="alert"]').textContent).toContain('Plein Air');
  expect(container.querySelector('.image-detail')).toBeNull();

  await act(async () => { button('Retry').click(); });
  expect(history.location.pathname).toBe('/artwork/album/plein-air-acrylic');
  expect(fetchGallery).toHaveBeenCalledTimes(2);
  expect(container.querySelector('[role="alert"]')).toBeNull();
});

it('provides a way back from an unknown album without fetching it', () => {
  renderAt('/artwork/album/unknown');
  expect(container.textContent).toContain('Album not found');
  expect(link('All albums').getAttribute('href')).toBe('/artwork');
  expect(fetchGallery).not.toHaveBeenCalled();
});

it('ignores an earlier album response after a newer selection', async () => {
  let finishFirstRequest;
  fetchGallery
    .mockImplementationOnce(() => new Promise(resolve => { finishFirstRequest = resolve; }))
    .mockResolvedValueOnce([]);

  act(() => { link('Plein Air').click(); });
  expect(container.querySelector('.image-detail [role="status"]').textContent).toContain('Loading Plein Air');
  expect(container.querySelector('.image-detail .placeholder')).not.toBeNull();

  await act(async () => { link('Scenery').click(); });
  await act(async () => { finishFirstRequest([]); });
  expect(container.querySelector('[role="status"]').textContent).toContain('Scenery');
  expect(container.querySelector('.image-detail')).toBeNull();
});

it('links to a category and opens a filtered gallery from the overview', async () => {
  act(() => { link('Browse by filter').click(); });
  act(() => { link('Location').click(); });
  expect(history.location.pathname).toBe('/artwork/filter/location');
  expect(fetchGallery).not.toHaveBeenCalled();

  fetchGallery.mockResolvedValue([]);
  await act(async () => { link('Boston').click(); });
  expect(history.location.pathname).toBe('/artwork/filter/location/downtown-boston');
  expect(fetchGallery).toHaveBeenCalledWith('downtown-boston');
});

it('restores a directly linked filter and follows Back and Forward', async () => {
  fetchGallery.mockResolvedValue([]);
  renderAt('/artwork/filter/subject/subj-politic');
  await act(async () => {});

  expect(fetchGallery).toHaveBeenCalledWith('subj-politic');
  expect(link('Subject').classList.contains('active')).toBe(true);
  expect(link('Political').getAttribute('aria-current')).toBe('page');

  act(() => { link('Medium').click(); });
  expect(link('Medium').classList.contains('active')).toBe(true);
  expect(fetchGallery).toHaveBeenCalledTimes(1);

  await act(async () => { history.goBack(); });
  expect(link('Political').getAttribute('aria-current')).toBe('page');
  expect(fetchGallery).toHaveBeenCalledTimes(2);

  act(() => { history.goForward(); });
  expect(link('Medium').classList.contains('active')).toBe(true);
});

it.each(['/artwork/filter/unknown', '/artwork/filter/medium/subj-politic'])(
  'provides a way back from an invalid filter at %s',
  pathname => {
    renderAt(pathname);
    expect(container.textContent).toContain('Filter not found');
    expect(link('Browse by filter').getAttribute('href')).toBe('/artwork/filter');
    expect(fetchGallery).not.toHaveBeenCalled();
  }
);

const works = [
  { public_id: 'art/first', context: { custom: { completed: '2025', caption: 'First' } } },
  { public_id: 'art/second + study', context: { custom: { completed: '2024', caption: 'Second' } } }
];
const visibleWork = () => container.querySelector('.image-detail [data-public-id]')?.dataset.publicId;
const thumbnail = id => Array.from(container.querySelectorAll('.gallery .thumbnail'))
  .find(element => element.dataset.publicId === id);

it.each(['/artwork/album/plein-air-acrylic', '/artwork/filter/subject/subj-politic'])(
  'restores a direct work link on %s',
  async path => {
    fetchGallery.mockResolvedValue(works);
    renderAt(`${path}?work=art%2Fsecond+%2B+study`);
    await act(async () => {});

    expect(visibleWork()).toBe(works[1].public_id);
    expect(thumbnail(works[1].public_id).classList.contains('selected')).toBe(true);
  }
);

it('tracks thumbnail and arrow selections in history without reloading the gallery', async () => {
  fetchGallery.mockResolvedValue(works);
  renderAt('/artwork/album/plein-air-acrylic');
  await act(async () => {});
  expect(visibleWork()).toBe(works[0].public_id);

  act(() => { thumbnail(works[1].public_id).click(); });
  expect(new URLSearchParams(history.location.search).get('work')).toBe(works[1].public_id);
  act(() => { container.querySelector('button[title="Next Image"]').click(); });
  expect(new URLSearchParams(history.location.search).get('work')).toBe(works[0].public_id);

  act(() => { history.goBack(); });
  expect(visibleWork()).toBe(works[1].public_id);
  act(() => { history.goForward(); });
  expect(visibleWork()).toBe(works[0].public_id);
  expect(fetchGallery).toHaveBeenCalledTimes(1);
});

it('offers the gallery URL when the linked work is missing', async () => {
  fetchGallery.mockResolvedValue(works);
  renderAt('/artwork/album/plein-air-acrylic?work=art%2Fremoved');
  await act(async () => {});

  expect(container.textContent).toContain('Artwork not found in this gallery');
  act(() => { link('Open gallery').click(); });
  expect(history.location.search).toBe('');
  expect(visibleWork()).toBe(works[0].public_id);
});
