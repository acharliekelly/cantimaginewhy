import { fetchGallery } from '../../utils/cloudinaryApi';
import { onsitePhotos } from '../../utils/onsiteUtils';

import * as ACTIONS from './actionTypes';


// SYNCH

/**
 * 
 * @param {String} mode 
 * @returns {Action}
 */
export function selectMode(mode) {
  return {
    type: ACTIONS.SELECT_MODE,
    mode
  }
}

/**
 * 
 * @param {String} category 
 * @returns {Action}
 */
export function selectFilter(category) {
  return {
    type: ACTIONS.SELECT_FILTER,
    mode: 'FILTER',
    filterBy: category
  }
}


/**
 * use gallery from state, perform sort in utils, return sorted gallery
 * @param {String} sortField 
 * @param {boolean} isDesc  
 * @returns {Action}
 */
export function sortGallery(sortField, isDesc) {
  return {
    type: ACTIONS.SORT_GALLERY,
    field: sortField,
    desc: isDesc
  }
}


/**
 * 
 * @param {int} index   
 * @returns {Action}
 */
export function selectPrimaryImage(index) {
  return {
    type: ACTIONS.SELECT_PRIMARY_IMAGE,
    index
  }
}


/**
 * 
 * @param {int} index   
 * @returns {Action}
 */
export function selectAssociatedImage(index) {
  return {
    type: ACTIONS.SELECT_ASSOC_IMAGE,
    index
  }
}






// ASYNC

/**
 * 
 * @param {String} galleryName  
 * @returns {Action}
 */
export function requestGallery(galleryName) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    galleryName
  }
}

/**
 * 
 * @param {String} galleryName 
 * @param {JSON} response   
 * @returns {Action}
 */
export function receiveGallery(galleryName, response) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    status: 'success',
    galleryName,
    images: response.data.resources,
    index: 0
  }
}

/**
 * 
 * @param {String} galleryName 
 * @param {Error} err   
 * @returns {Action}
 */
export function galleryError(galleryName, err) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    status: 'error',
    galleryName,
    error: err
  }
}


/**
 * 
 * @param {String} refKey   
 * @returns {Action}
 */
export function requestAssociatedImages(refKey) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    refKey
  }
}

/**
 * 
 * @param {JSON} response 
 * @returns {Action}
 */
export function receiveAssociatedImages(response) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    status: 'success',
    images: response.data.resources,
  }
}

/**
 * 
 * @param {Error} err   
 * @returns {Action}
 */
export function associatedImagesError(err) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    status: 'error',
    error: err
  }
}



/**
 * 
 * @param {String} productKey   
 * @returns {Action}
 */
export function requestProducts(productKey) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    productKey
  }
}

/**
 * 
 * @param {JSON} response   
 * @returns {Action}
 */
export function receiveProducts(response) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    status: 'success',
    products: response.data.resources
  }
}

/**
 * 
 * @param {Error} err   
 * @returns {Action}
 */
export function productListError(err) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    status: 'error',
    error: err
  }
}

/**
 * 
 * @param {Array<float,float>} geoTag   
 * @returns {Action}
 */
export function requestGeoData(geoTag) {
  return {
    type: ACTIONS.FETCH_GEO_DATA,
    geoTag
  }
}

/**
 * 
 * @param {JSON} response 
 * @returns {Action}
 */
export function receiveGeoData(response) {
  return {
    type: ACTIONS.FETCH_GEO_DATA,
    status: 'success',
    payload: response.data
  }
}

/**
 * 
 * @param {Error} err 
 * @returns {Action}
 */
export function geoDataError(err) {
  return {
    type: ACTIONS.FETCH_GEO_DATA,
    status: 'error',
    error: err
  }
}



// THUNKS


/**
 * 
 * @param {String} galleryTag   
 */
export function fetchMainGallery(galleryTag) {
  return function (dispatch) {
    dispatch(requestGallery(galleryTag))
    return fetchGallery(galleryTag)
      .then(response => response.json())
      .then(json => 
        dispatch(receiveGallery(galleryTag, json))
      )
      .catch(err => galleryError(galleryTag, err))
  }
}

/**
 * 
 * @param {String} refKey 
 */
export function fetchAssociatedGallery(refKey) {
  return function (dispatch) {
    dispatch(requestAssociatedImages(refKey))
    return onsitePhotos(refKey)
      .then(response =>
        dispatch(receiveAssociatedImages(response))
      )
      .catch(err => 
        dispatch(associatedImagesError(err)))
  }
}
