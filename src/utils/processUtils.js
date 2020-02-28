// processUtils.js

import { fetchGallery } from './imageApi';

const processData = {
  "caterpillar_hill": 4,
  "charles_river": 0,
  "capitol": 2,
  "cambridge_hyatt": 5,
  "cronins_landing": 0,
  "buildings_n_stuff": 4,
  "bpg_hancock": 6,
  "eliot_bridge": 0,
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
  "portsmouth": 0,
  "hatch_shell_east": 0,
  "herter_birch": 3,
  "watertown_dam": 3,
  "tea_crabapple": 2,
  "beaver_brook": 2,
  "cambridge_common": 0,
  "parker_point": 9,
  "jfk_park": 0,
  "mit_sunset": 0,
  "mit_night": 0,
  "footbridge": 3,
  "herter": 0,
  "public_garden_2": 3,
  "dunster": 1,
  "longfellow_night": 0,
  "skyline": 0
};

/**
 * Returns array of cpi strings
 * @param {str} referenceKey 
 * @param {int} imageCount 
 */
const imageSeries = (referenceKey, imageCount) => {
  const series = [];
  const imgStr = `photos/onsite-${referenceKey}-`;
  series.push(imgStr + 'view');
  for (let i = 1; i <= imageCount; i++) {
    series.push(imgStr + i);
  }
  series.push(imgStr + 'final');
  return series;
}

export const lookupSeriesCount = referenceKey => {
  return processData[referenceKey] || -1;
}

/**
 * Returns array of CPI strings for images in series
 * @param {*} referenceKey 
 */
export const getSeries = referenceKey => {
  if (Object.keys(processData).includes(referenceKey)) {
    const count = processData[referenceKey];
    return imageSeries(referenceKey, count);
  } else {
    return null;
  }
}

/**
 * Returns array of CPI strings for images in series
 * if validate, will check them against cloud library
 * @param {str} referenceKey 
 * @param {bool} validate 
 */
export const getImageSeries = (referenceKey, validate = false) => {
  if (validate) {
    console.log('validating progress series')
    return validateSeries(referenceKey);
  } else {
    console.log('skipping series validation')
    return getSeries(referenceKey);
  }
}

const library = [];

const loadLibrary = () => {
  fetchGallery('onsite')
    .then(res => {
      library.push(res.data.resources)
    })
}


const initLibrary = () => {
  if (library.length === 0) {
    loadLibrary();
    console.log('loaded library with ' + library.length + ' images')
  }
}

// compare list data to imageSeries, remove missing items from series
export const validateSeries = refKey => {
  const series = getSeries(refKey);
  console.log('Generated Series: ' + series.length + ' images')
  const resources = getSeriesData(refKey);
  console.log('Fetched Series: ' + resources.length + ' images')
  if (series.length === resources.length) {
    // probably all good
    return series;
  } else {
    console.log('using fetched resource list')
    return flattenResources(resources).sort(cpidSort);
  }
}

// take resource list, extract list of public ids
export const flattenResources = resourceList => {
  const idStrings = [];
  resourceList.forEach(item => idStrings.push(item.public_id));
  return idStrings;
}

/**
 * Returns array of resource objects
 * @param {*} refKey 
 */
export const getSeriesData = refKey => {
  initLibrary();
  // filtered list of resources
  const list = library.filter(res => (res.context.custom.ref === refKey))
  return list;
}


// how to sort CPID strings for process images
export const cpidSort = (itemA, itemB) => {
  if (itemA === itemB) return 0;

  const arrA = itemA.split('-');
  const arrB = itemB.split('-');
  // should both be 3-item arrays, starting with 'photos/onsite'
  if (arrA[0] !== arrB[0]) {
    // wrong kind of string
    return 0;
  } else if (arrA[1] !== arrB[1]) {
    // different refkeys. compare them
    return arrA[1].localeCompare(arrB[1])
  } else {
    // keys match, compare endings
    return progressSuffixSort(arrA[2], arrB[2]);
  }
}

// assumes both are last part of progress image cpis
const progressSuffixSort = (strA, strB) => {
  if (strA === strB) return 0;
  if (strA === 'view') { // itemA is first
    return -1;
  } else if (strA === 'final') { // itemA is last
    return 1;
  } else if (strB === 'view') { // itemB is first
    return 1;
  } else if (strB === 'final') { // itemB is last
    return -1;
  } else { // both are numbers
    return strA.localeCompare(strB);
  }
}

