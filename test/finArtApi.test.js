const { faaAvailable, faaLookup } = require('../src/utils/fineArtApi');


test('check if image exists in dictionary', () => {
  const isAvailable = faaAvailable('art/a_friday_in_september');
  expect(isAvailable).toBeTruthy();
});

test('check if lookup returns correct code', () => {
  expect(faaLookup('art/boston-public-gardens_2019')).toBe('boston-public-garden-1');
});
