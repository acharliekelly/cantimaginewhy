import { fetchGallery } from 'Api/cloudinaryApi';

// how to sort CPID strings for process images
const cpiStrSort = (itemA, itemB) => {
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
    return arrA[2].localeCompare(arrB[2])
  }
}

// for Objects instead of CPI strings
const jsonObjectSort = (imageA, imageB) => {
  if (imageA.hasOwnProperty('public_id') && imageB.hasOwnProperty('public_id')) {
    return cpiStrSort(imageA.public_id, imageB.public_id)
  }
  // wrong object types
  return 0;
}

/**
 * Returns CIO array
 * @param {String} refKey 
 * @returns {Array<CloudinaryImage>}
 */
export const onsitePhotos = refKey => {
  return fetchGallery('onsite')
    .then(resources => filterResources(resources, refKey))
    .then(series => series.sort(jsonObjectSort))
}

/**
 * True if any photos exist
 * @param {String} refKey 
 */
export const isSeriesExist = refKey => {
  return fetchGallery('onsite')
    .then(resources => exists(resources, refKey))
}

const exists = (resources, key) => {
  return resources.some(resource => resource.public_id.includes(key))
}


const filterResources = (resources, refKey) => {
  return resources.filter(resource => resource.public_id.includes(refKey));
}
