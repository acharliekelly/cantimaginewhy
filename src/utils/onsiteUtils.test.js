const {  onsitePhotos, isSeriesExist, getSeriesCount } = require('./onsiteUtils');


test('filter by context', () => {
  
  return onsitePhotos('dunster', true).then(photos => {
    // console.log('photos: ', photos)
    expect(photos.length).toBe(3)
  })
})

test('filter by filename', () => {
  return onsitePhotos('dunster', false).then(photos => {
    // console.log('photos: ', photos)
    expect(photos.length).toBe(3)
  })
})

test('check series count', () => {
  const result = getSeriesCount('dunster');
  expect(result).toBe(3)
})

test('check that series exists', () => {
  return isSeriesExist('waltham_waterfall').then(response => {
    expect(response).toBeTrue()
  })
})
test('check that series does not exist', () => {
  return isSeriesExist('fox_park').then(response => {
    // console.log(response)
    expect(response).not.toBeTrue()
  })
})

