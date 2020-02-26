const { fetchGallery, cleanImageSrc } = require('./imageApi');

// TODO: test imageApi functions

test('check for correct url', () => {
  const cpid = 'art/midwinter';
  const expectedResult = 'https://res.cloudinary.com/cantimaginewhy/w_1000/' + cpid + '.jpg';
  expect(cleanImageSrc(cpid)).toBe(expectedResult);
});

test('check number of items returned', () => {
  const cambridgeItems = 11; // currently 11 images tagged with 'cambridge'
  return fetchGallery('cambridge').then(resources => {
    expect(resources.length).toBe(cambridgeItems);
  })
});

test('fetch fails with error', () => {
  expect.assertions(1);
  return fetchGallery('nothing').catch(e => expect(e).toMatch('error'))
})