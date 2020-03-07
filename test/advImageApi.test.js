const {
  fetchImages,
  fetchAlbum,
  fetchProcessImages,
  fetchTagImages
} = require('../src/utils/advImageApi');


test('check new expression', () => {
  const expression = 'folder=icon';
  const expectedResults = 6;
  return fetchImages(expression, 10).then(response => {
    expect(response.resources.length).toBe(expectedResults);
  })
})

test('contents of album', () => {
  const albumName = 'People';
  const expectedResults = 17;
  return fetchAlbum(albumName).then(response => {
    expect(response.resources.length).toBe(expectedResults)
  })
})

test('process images', () => {
  const refKey = 'watertown_dam';
  const expectedResults = 5;
  return fetchProcessImages(refKey).then(response => {
    expect(response.resources.length).toBe(expectedResults);
  })
})

test('tagged images', () => {
  const tag = 'en plein air';
  return fetchTagImages(tag).then(response => {
    expect(response.resources.length).toBe(42);
    expect(response.resources[0].public_id).toBe('art/a_friday_in_september');
  })
})
