const { getSeries, lookupSeriesCount } = require('./processUtils');

const refKey = 'memorial_drive';

test('check number of process images', () => {
  expect(lookupSeriesCount(refKey)).toBe(4)
})

test('get image series', () => {
  const series = getSeries(refKey);

  expect(series).not.toBeNull();
  expect(series.length).toBe(6);
  expect(series[0]).toBe('photos/onsite-memorial_drive-view');
})
