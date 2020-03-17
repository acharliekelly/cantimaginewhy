// imageContext.js

import { faaAvailable } from './fineArtApi';
import { isSeriesExist } from './onsiteUtils';


export const loadImageProps = imageObj => {
  const imgId = imageObj.public_id;
    const ref = getPictureProperty(imageObj, 'key', '-');
    const infoObj = {
      id: imgId,
      moreInfo: true,
      hasContext: imageObj.hasOwnProperty('context'),
      title: getPictureProperty(imageObj, 'caption', 'Untitled'),
      description: getPictureProperty(imageObj, 'alt'),
      location: getPictureProperty(imageObj, 'location'),
      medium: getPictureProperty(imageObj, 'medium'),
      size: getPictureProperty(imageObj, 'size'),
      year: getPictureProperty(imageObj, 'year'),
      forSale: ((getPictureProperty(imageObj, 'original')) === 'available'),
      forPrint: (faaAvailable(imgId)),
      refKey: ref,
      processImgs: isSeriesExist(ref),
      price: getPictureProperty(imageObj, 'price', 'NFS'),
      materialInfo: hasProperty(imageObj, 'medium') && hasProperty(imageObj, 'size'),
    }
    // determine if image has any info beyond title
    if (!infoObj.hasContext ||    // no context
        (infoObj.title === 'Untitled' && !(infoObj.forSale || infoObj.forPrint)) || // no title & no sale
        (!infoObj.year && !infoObj.description && !infoObj.location)) {   // no other info fields
      infoObj.moreInfo = false;
    }
    return infoObj;
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
