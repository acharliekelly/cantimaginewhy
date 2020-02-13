import { paddedImageSrc } from './imageApi';
import { faaAvailable } from './fineArtApi';


export const loadImageProps = imageObj => {
  const infoObj = {
    id: imageObj.public_id,
    source: paddedImageSrc(imageObj.public_id, 600, 400),
    title: getPictureCaption(),
    description: getPictureProperty('alt'),
    location: getPictureProperty('location'),
    medium: getPictureProperty('medium'),
    size: getPictureProperty('size'),
    year: getPictureProperty('year'),
    forSale: (getPictureProperty('original') === 'available'),
    forPrint: (faaAvailable(imageObj.public_id)),
    refKey: getPictureProperty('key', '-'),
    // processImgs: (getPictureProperty('key', '-') !== '-'),
    processImgs: false,
    price: getPictureProperty('price', 'NFS'),
    materialInfo: hasProperty('medium') && hasProperty('size'),
  }
  console.log('image info: ' + infoObj);
  return infoObj;
}


const getPictureCaption = () => {
  return getPictureProperty('caption', 'Untitled');
}

const getPictureProperty = (pictureObj, property, errValue = '') => {
  let val;
  try {
    val = pictureObj.context.custom[property];
  } catch (err) {
    val = errValue;
  }
  return val;
}

const hasProperty = (pictureObj, propertyName) => {
  if (pictureObj.hasOwnProperty('context')) {
    return pictureObj.context.custom.hasOwnProperty(propertyName);
  } else {
    return false;
  }
}
