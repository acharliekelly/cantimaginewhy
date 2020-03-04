import { fetchGallery } from './imageApi';



// take resource list, extract list of public ids
export const flattenResources = resourceList => {
  const idStrings = [];
  resourceList.forEach(item => idStrings.push(item.public_id));
  return idStrings;
}

// sort depending on item type
export const progressSortSelect = (itemA, itemB) => {
  if (typeof itemA === 'string') {
    return cpiStrSort(itemA, itemB);
  } else {
    return 
  }
}

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

const fetchOnsite = () => {
  return fetchGallery('onsite').then(res => res.data.resources)
}

/**
 * Returns list of cpi strings
 * @param {str} refKey 
 * @param {boolean} useContext 
 */
export const onsitePhotos = (refKey, useContext = true) => {
  return fetchOnsite()
    .then(resources => filterResources(resources, refKey, useContext))
    .then(series => series.sort(jsonObjectSort))
}

/**
 * True if any photos exist
 * @param {str} refKey 
 */
export const isSeriesExist = refKey => {
  return fetchOnsite()
    .then(resources => exists(resources, refKey))
}

const exists = (resources, key) => {
  return resources.some(resource => resource.context.custom.ref === key)
}

/**
 * Number of photos in series
 * @param {str} refKey 
 */
export const getSeriesCount = refKey => {
  return fetchOnsite()
    .then(resources => filterResources(resources, refKey, true))
    .then(filtered => resCount(filtered))
}

const resCount = resources => {
  return resources.length
}

const filterResources = (resources, refKey, useContext) => {
  if (useContext) {
    return filterByContext(resources, refKey)
  } else {
    return filterByFilename(resources, refKey)
  }
}


const filterByContext = (resources, refKey) => {
  return resources.filter(resource => resource.context.custom.ref === refKey);
}

const filterByFilename = (resources, refKey) => {
  return resources.filter(resource => resource.public_id.includes(refKey));
}
