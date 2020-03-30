// imageContext.js

/**
 * Returns object to use for image detail
 * @param {*} imageObj 
 * 
 * - id: publicId
 * - hasContext: any info
 * - moreInfo: any info beyond title
 * - title: .caption
 * - description: .alt
 * - location, medium, size, year, price: context props 
 * - materialInfo: has medium & size
 * - refKey: .key (lookup for progress photos)
 * - productKey: .faa (lookup for Products)
 * - forSale: .original == 'available'
 * - forPrint: has .faa value
 * - completed: completion date (yyyy-mm-dd)
 * - hasProgress: has any onsite photos
 */
export const loadImageProps = imageObj => {
  const imgId = imageObj.public_id;
    const ref = getPictureProperty(imageObj, 'key', '-');
    const infoObj = {
      id: imgId,
      moreInfo: true,
      hasContext: imageObj.hasOwnProperty('context'),
      showOptions: imgId.startsWith('art/'),
      title: getPictureProperty(imageObj, 'caption', 'Untitled'),
      description: getPictureProperty(imageObj, 'alt'),
      location: getPictureProperty(imageObj, 'location'),
      medium: getPictureProperty(imageObj, 'medium'),
      size: getPictureProperty(imageObj, 'size'),
      year: getPictureProperty(imageObj, 'year'),
      completed: getPictureProperty(imageObj, 'completed'),
      forSale: ((getPictureProperty(imageObj, 'original')) === 'available'),
      forPrint: hasProperty(imageObj, 'faa'),
      productKey: getPictureProperty(imageObj, 'faa'),
      refKey: ref,
      price: getPictureProperty(imageObj, 'price', 'NFS'),
      materialInfo: hasProperty(imageObj, 'medium') && hasProperty(imageObj, 'size'),
    }
    // determine if image has any info beyond title
    if (!infoObj.hasContext ||    // no context
        (infoObj.title === 'Untitled' && !(infoObj.forSale || infoObj.forPrint)) || // no title & no sale
        (!infoObj.year && !infoObj.description && !infoObj.location)) {   // no other info fields
      infoObj.moreInfo = false;
    }
    if (infoObj.completed) {
      infoObj.dateCompleted = new Date(infoObj.completed);
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
