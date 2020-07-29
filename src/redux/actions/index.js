import { fetchGallery } from '../../utils/cloudinaryApi';
import { onsitePhotos } from '../../utils/onsiteUtils';

import * as ACTIONS from './actionTypes';
import { MAIN_CONTEXT } from '../../utils/constants';

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
export function selectImage(context, index) {
  return {
    type: context === MAIN_CONTEXT 
      ? ACTIONS.SELECT_PRIMARY_IMAGE 
      : ACTIONS.SELECT_ASSOC_IMAGE,
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
export function receiveGallery(response) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    status: 'success',
    payload: response.data.resources
  }
}

/**
 * 
 * @param {String} galleryName 
 * @param {Error} err   
 * @returns {Action}
 */
export function galleryError(error) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    status: 'error',
    error
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
    payload: response.data.resources,
  }
}

/**
 * 
 * @param {Error} err   
 * @returns {Action}
 */
export function associatedImagesError(error) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    status: 'error',
    error
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
    payload: response.data.resources
  }
}

/**
 * 
 * @param {Error} err   
 * @returns {Action}
 */
export function productListError(error) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    status: 'error',
    error
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
export function geoDataError(error) {
  return {
    type: ACTIONS.FETCH_GEO_DATA,
    status: 'error',
    error
  }
}



// temporarily a local call
export function requestContactLinks(sectionId) {
  return {
    type: ACTIONS.FETCH_LINKS,
    payload: sectionId
  }
}

export function receiveContactLinks(response) {
  return {
    type: ACTIONS.FETCH_LINKS,
    status: 'success',
    payload: response
  }
}

export function contactLinksError(err) {
  return {
    type: ACTIONS.FETCH_LINKS,
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
