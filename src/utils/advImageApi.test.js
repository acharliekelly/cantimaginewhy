const {
  searchApiUrlTest,
  fetchImages,
  fetchAlbum,
  fetchProcessImages,
  fetchTagImages
} = require('./advImageApi');

const param = '878753873422768:Hk5O_AutOONuI-2U4F05x5pVDTY';

test('check search URL', () => {
  const expectedValue = '878753873422768:Hk5O_AutOONuI-2U4F05x5pVDTY@api.cloudinary.com/v1_1/cantimaginewhy/resources/search'
  expect(searchApiUrlTest(param)).toBe(expectedValue);
})

test('check new expression', () => {
  const expression = 'folder=icon';
  const expectedResults = 6;
  return fetchImages(expression, 10, param).then(response => {
    expect(response.resources.length).toBe(expectedResults);
  })
})

test('contents of album', () => {
  const albumName = 'People';
  const expectedResults = 17;
  return fetchAlbum(albumName, param).then(response => {
    expect(response.resources.length).toBe(expectedResults)
  })
})

test('process images', () => {
  const refKey = 'watertown_dam';
  const expectedResults = 5;
  return fetchProcessImages(refKey, param).then(response => {
    expect(response.resources.length).toBe(expectedResults);
  })
})

test('tagged images', () => {
  const tag = 'en plein air';
  return fetchTagImages(tag, param).then(response => {
    expect(response.resources.length).toBe(42);
    expect(response.resources[0].public_id).toBe('art/a_friday_in_september');
  })
})
