import { fetchGallery } from '../utils/cloudinaryApi';
import { onsitePhotos } from '../utils/onsiteUtils';

import * as ACTIONS from '../actions/actionTypes';


// MODE
export function selectMode(mode) {
  return {
    type: ACTIONS.SELECT_MODE,
    mode
  }
}

export function selectFilterMode(category) {
  return {
    type: ACTIONS.SELECT_FILTER_MODE,
    mode: 'FILTER',
    filterBy: category
  }
}


// GALLERY


export function requestGallery(galleryName) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    galleryName
  }
}

export function receiveGallery(galleryName, response) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    status: 'success',
    galleryName,
    images: response.data.resources,
    index: 0
  }
}

export function galleryError(galleryName, err) {
  return {
    type: ACTIONS.FETCH_GALLERY,
    status: 'error',
    galleryName,
    error: err
  }
}



// use gallery from state, perform sort in utils, return sorted gallery
export function sortGallery(sortField, isDesc) {
  return {
    type: ACTIONS.SORT_GALLERY,
    field: sortField,
    desc: isDesc
  }
}





export function selectPrimaryImage(index) {
  return {
    type: ACTIONS.SELECT_PRIMARY_IMAGE,
    index
  }
}



export function selectAssociatedImage(index) {
  return {
    type: ACTIONS.SELECT_ASSOC_IMAGE,
    index
  }
}




export function requestAssociatedImages(refKey) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    refKey
  }
}

export function receiveAssociatedImages(response) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    status: 'success',
    images: response.data.resources,
  }
}

export function associatedImageError(err) {
  return {
    type: ACTIONS.FETCH_ASSOC_IMAGES,
    status: 'error',
    error: err
  }
}




export function requestProducts(productKey) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    productKey
  }
}

export function receiveProducts(response) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    status: 'success',
    products: response.data.resources
  }
}

export function productListError(err) {
  return {
    type: ACTIONS.FETCH_PRODUCT_LIST,
    status: 'error',
    error: err
  }
}

export function fetchMainGallery(galleryTag) {
  return function (dispatch) {
    dispatch(requestGallery(galleryTag))
    return fetchGallery(galleryTag)
      .then(response => response.json())
      .then(json => 
        dispatch(receiveGallery(galleryTag, json))
      )
  }
}

export function fetchAssociatedGallery(refKey) {
  return function (dispatch) {
    dispatch(requestAssociatedImages(refKey))
    return onsitePhotos(refKey)
      .then(response =>
        dispatch(receiveAssociatedImages(response))
      )
  }
}
