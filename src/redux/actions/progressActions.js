import { onsitePhotos } from 'Utils/onsiteUtils';
import {
  FETCH_ASSOC_IMAGES, 
  SELECT_ASSOC_IMAGE 
} from 'ActionTypes';
import { STATUS } from '.';


/**
 * 
 * @param {String} refKey   
 * @returns {Action}
 */
function requestAssociatedImages(refKey) {
  return {
    type: FETCH_ASSOC_IMAGES,
    status: STATUS.WAITING,
    refKey
  }
}

/**
 * 
 * @param {JSON} response 
 * @returns {Action}
 */
function receiveAssociatedImages(response) {
  return {
    type: FETCH_ASSOC_IMAGES,
    status: STATUS.SUCCESS,
    payload: response.data.resources,
  }
}

/**
 * 
 * @param {Error} err   
 * @returns {Action}
 */
function associatedImagesError(error) {
  return {
    type: FETCH_ASSOC_IMAGES,
    status: STATUS.FAIL,
    error
  }
}


export function selectProgressImage(index) {
  return {
    type: SELECT_ASSOC_IMAGE,
    index
  }
}


/**
 * 
 * @param {String} refKey 
 */
export function fetchProgressGallery(refKey) {
  return function (dispatch) {
    dispatch(requestAssociatedImages(refKey))
    return onsitePhotos(refKey)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAssociatedImages(json))
      )
      .catch(err => 
        dispatch(associatedImagesError(err))
      )
  }
}
