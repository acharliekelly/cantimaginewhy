import { fetchGallery } from './cloudinaryApi';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch = originalFetch;
});

it('requests the Cloudinary tag list and returns its resources', async () => {
  const resources = [{ public_id: 'art/example' }];
  global.fetch.mockResolvedValue({ ok: true, json: async () => ({ resources }) });

  await expect(fetchGallery('favorite')).resolves.toBe(resources);
  expect(global.fetch).toHaveBeenCalledWith(
    'https://res.cloudinary.com/cantimaginewhy/image/list/favorite.json'
  );
});

it('rejects on an HTTP error without reading the response body', async () => {
  const json = jest.fn();
  global.fetch.mockResolvedValue({ ok: false, status: 404, json });

  await expect(fetchGallery('missing')).rejects.toThrow('404');
  expect(json).not.toHaveBeenCalled();
});
