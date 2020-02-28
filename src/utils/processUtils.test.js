const { 
  getSeries, 
  lookupSeriesCount,
  validateSeries,
  flattenResources,
  getSeriesData,
  cpidSort
} = require('./processUtils');


test('check number of process images', () => {
  expect(lookupSeriesCount('memorial_drive')).toBe(4)
})

test('get image series', () => {
  const series = getSeries('memorial_drive');

  expect(series).not.toBeNull();
  expect(series.length).toBe(6);
  expect(series[0]).toBe('photos/onsite-memorial_drive-view');
})

test('check sorting function', () => {
  const ref = 'dunster';
  const disorder = ['1', '3', 'final', 'view', '4', '2'];
  const arr = [];
  disorder.forEach(w => arr.push(`photos/onsite-${ref}-${w}`));
  expect(arr[0]).not.toBe('photos/onsite-dunster-view');
  expect(arr[1]).not.toBe('photos/onsite-dunster-1');
  arr.sort(cpidSort)
  expect(arr[0]).toBe('photos/onsite-dunster-view')
  expect(arr.indexOf('photos/onsite-dunster-final')).toBe(5);
})

test('get true list of items', () => {
  const ref = 'september_esplanade';
  const arr = getSeriesData(ref);
  expect(arr.length).toBe(9);
})

test('convert resource list to CPI string list', () => {
  const ref = 'dunster';
  const arr = getSeriesData(ref);
  expect(arr.length).toBe(3)
  const list = flattenResources(arr);
  expect(list.length).toBe(3)
  expect(list).toContain('photos/onsite-dunster-view');
})

test('validate series when generated series is wrong', () => {
  const ref = 'skyline' // only has final, no view. 
  // generated series should have 2, but actual has 1
  const generated = getSeries(ref);
  const resources = getSeriesData(ref);
  expect(generated.length).not.toBe(resources.length);
  const validated = validateSeries(ref);
  expect(validated).not.toBeNull();
  expect(validated.length).toBe(resources.length);
  expect(generated).toContain('photos/onsite-skyline-view')
  expect(validated).not.toContain('photos/onsite-skyline-view')
})
