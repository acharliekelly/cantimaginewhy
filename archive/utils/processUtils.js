/**
 * Process Utils
 * 
 * Tools for handling Process Images (photos of paintings in progress),
 * based on table of image count by refKey, as opposed to Onsite Utils,
 * which rely on pulling live data from Cloudinary. Using table is probably 
 * less accurate, but much faster.
 * 
 */

 /**
  * Each image key (usually same as original filename)
  * mapped to number of process photos, not including 
  * Final views. If count is 0, the image has
  * an Initial and a Final view. If -1, only a Final.
  * If there is no Final image, then the image key is
  * not listed.
  */
const processData = {
  "caterpillar_hill": 4,
  "charles_river": -1,
  "capitol": 2,
  "cambridge_hyatt": 5,
  "cronins_landing": 0,
  "buildings_n_stuff": 4,
  "bpg_hancock": 6,
  "eliot_bridge": -1,
  "fall_mt_feake": 3,
  "fall_colors": 2,
  "first_parish": 2,
  "fall_footbridge": 4,
  "autumn_woods": 1,
  "riparian_balcony": 1,
  "swan_pond": 5,
  "september_esplanade": 6,
  "waltham_waterfall": 8,
  "seven_hills_park": 0,
  "norumbega_tower": 2,
  "memorial_drive": 4,
  "gosport_harbor": 3,
  "portsmouth": -1,
  "hatch_shell_east": -1,
  "herter_birch": 3,
  "watertown_dam": 3,
  "tea_crabapple": 2,
  "beaver_brook": 2,
  "cambridge_common": -1,
  "parker_point": 9,
  "jfk_park": -1,
  "mit_sunset": -1,
  "footbridge": 3,
  "herter": -1,
  "public_garden_2": 3,
  "dunster": 1,
  "longfellow_night": -1,
  "skyline": -1
};

/**
 * Returns array of cpi strings
 * @param {str} referenceKey 
 * @param {int} imageCount 
 */
const imageSeries = (referenceKey, imageCount) => {
  const series = [];
  const imgStr = `photos/onsite-${referenceKey}-`;
  for (let i = 0; i <= imageCount; i++) {
    series.push(imgStr + i);
  }
  series.push(imgStr + 'final');
  return series;
}

export const lookupSeriesCount = referenceKey => {
  return processData[referenceKey] || NaN;
}

export const hasProgressSeries = referenceKey => {
  return !isNaN(lookupSeriesCount(referenceKey));
}

/**
 * Returns array of CPI strings for images in series
 * @param {*} referenceKey 
 */
export const generateSeries = referenceKey => {
  if (Object.keys(processData).includes(referenceKey)) {
    const count = processData[referenceKey];
    return imageSeries(referenceKey, count);
  } else {
    return null;
  }
}

export const nextImageId = currentImageId => {
  const refKey = currentImageId.split('-')[1];
  const imgOrder = currentImageId.split('-')[2];
  const imgCount = lookupSeriesCount(refKey);

  if (isNaN(imgCount) || imgCount < 0) {
    // no other process images exist
    return currentImageId;
  }
  
  let strNext = '0';
  if (imgOrder.length === 1) { // imgOrder is a number
    const nNext = parseInt(imgOrder) + 1;
    if (nNext <= imgCount) {
      strNext = nNext.toString();
    } else {
      strNext = 'final';
    }
  } // else imgOrder is 'final', so next should be '0'
  
  return `photos/onsite-${refKey}-${strNext}`;
  
}

/**
 * Get the previous image in a set of Process Photos
 * 
 * @param {string} currentImageId 
 */
export const previousImageId = currentImageId => {
  const refKey = currentImageId.split('-')[1];
  const imgOrder = currentImageId.split('-')[2];
  const imgCount = lookupSeriesCount(refKey);

  if (isNaN(imgCount) || imgCount < 0) {
    // no other process images exist
    return currentImageId;
  }

  let strNext = '0';
  if (imgOrder.length === 1) { // imgOrder is a number
    // return order - 1, or last image if 0
    const nOrder = parseInt(imgOrder);
    if (nOrder === 0) {
      strNext = 'final';
    } else {
      strNext = (nOrder - 1).toString();
    }
    
  } else { // imgOrder is a word
    if (imgOrder === 'final') {
      // previous image is same as count
      strNext = imgCount.toString();
    } else {
      // imgOrder = 'sale'
      strNext = 'final';
    }
  }
  
  return `photos/onsite-${refKey}-${strNext}`;
}


