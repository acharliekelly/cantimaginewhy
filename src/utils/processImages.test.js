const { 
  ImageProcessTypes, 
  getTotalOnsiteImageCount, 
  onsiteFinalImage,
  onsiteViewDefaultImage,
  onsiteViewImages,
  onsiteProgressImages,
  onsiteImages,
  getOnsiteCount,
  getOnsiteImage
} = require('./processImages');

const testImgCaterpillar = 'caterpillar_hill';
const testImgHancock = 'bpg_hancock';
const testImgEliotBridge = 'eliot_bridge';

// TODO: test methods

test('ImageProcessTypes.Final is 3', () => {
  const expectedResult = 3;
  expect(ImageProcessTypes.Final).toBe(expectedResult);
});

test('total count of images', () => {
  const expectedResult = 6; // 1 view, 4 progress, 1 final
  expect(getTotalOnsiteImageCount(testImgCaterpillar)).toBe(expectedResult);
});

test('check Final cpi', () => {
  const expectedResult = 'photos/onsite-bpg_hancock-final';
  expect(onsiteFinalImage(testImgHancock)).toBe(expectedResult);
});

test('check Default View cpi for item with multiple views', () => {
  const expectedResult = 'photos/onsite-bpg_hancock-view1';
  expect(onsiteViewDefaultImage(testImgHancock)).toBe(expectedResult);
});

test('check Default View cpi for item with one view', () => {
  const expectedResult = 'photos/onsite-caterpillar_hill-view';
  expect(onsiteViewDefaultImage(testImgCaterpillar)).toBe(expectedResult);
});

test('check Default View cpi for item with no views', () => {
  expect(onsiteViewDefaultImage(testImgEliotBridge)).toBeNull();
});


test('get all View cpis for item with multiple views', () => {
  const imgs = onsiteViewImages(testImgHancock);
  expect(imgs.length).toBe(3);
  expect(imgs).toContain('photos/onsite-bpg_hancock-view1');
});

test('get all View cpis for item with single view', () => {
  const imgs = onsiteViewImages(testImgCaterpillar);
  expect(imgs.length).toBe(1);
  expect(imgs).toContain('photos/onsite-caterpillar_hill-view');
});

test('get View cpis for item with no views', () => {
  const imgs = onsiteViewImages(testImgEliotBridge);
  expect(imgs.length).toBe(0);
});

test('get all Progress cpis for item', () => {
  const imgs = onsiteProgressImages(testImgHancock);
  expect(imgs.length).toBe(6);
  expect(imgs[0]).toBe('photos/onsite-bpg_hancock-1');
});

test('get all onsite images', () => {
  const refObj = onsiteImages(testImgHancock);
  expect(refObj.ref).toBe(testImgHancock);
  
  expect(refObj.view.length).toBe(3);

  expect(refObj.progress).toContain('photos/onsite-bpg_hancock-4');
});

test('get image count by type', () => {
  expect(getOnsiteCount(testImgCaterpillar, ImageProcessTypes.View)).toBe(1);
  expect(getOnsiteCount(testImgHancock, ImageProcessTypes.Progress)).toBe(6);
  expect(getOnsiteCount(testImgEliotBridge, ImageProcessTypes.View)).toBe(0);
  expect(getOnsiteCount(testImgCaterpillar, ImageProcessTypes.Final)).toBe(1);
  expect(getOnsiteCount(testImgHancock)).toBe(11);
});

test('get specific image by type and sequence', () => {
  expect(getOnsiteImage(testImgCaterpillar, ImageProcessTypes.Progress, 2)).toBe('photos/onsite-caterpillar_hill-2');
  expect(getOnsiteImage(testImgEliotBridge, ImageProcessTypes.Final)).toBe('photos/onsite-eliot_bridge-final');
  expect(getOnsiteImage(testImgEliotBridge, ImageProcessTypes.Progress, 5)).toBeFalsy();
  expect(getOnsiteImage(testImgHancock, ImageProcessTypes.Sale)).toBeTruthy();
});
