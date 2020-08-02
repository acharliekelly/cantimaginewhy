import { fetchGallery } from 'Api/cloudinaryApi';
import { MAIN_CONTEXT } from '../../utils/constants';
import {
  SORT_GALLERY,
  FETCH_GALLERY,
  SELECT_PRIMARY_IMAGE,
  NEXT_IMAGE,
  PREV_IMAGE
} from './actionTypes';
import { STATUS } from '.';

/**
 * use gallery from state, perform sort in utils, return sorted gallery
 * @param {String} sortField 
 * @param {boolean} isDesc  
 * @returns {Action}
 */
export function sortGallery(sortField, isDesc) {
  return {
    type: SORT_GALLERY,
    field: sortField,
    desc: isDesc
  }
}

export function selectMainImage(index) {
  return {
    type: SELECT_PRIMARY_IMAGE,
    index
  }
}

export function nextMainImage() {
  return {
    type: NEXT_IMAGE,
    context: MAIN_CONTEXT
  }
}

export function previousMainImage() {
  return {
    type: PREV_IMAGE,
    context: MAIN_CONTEXT
  }
}

/**
 * 
 * @param {String} galleryName  
 * @returns {Action}
 */
function requestGallery(galleryName) {
  return {
    type: FETCH_GALLERY,
    status: STATUS.WAITING,
    galleryName
  }
}

/**
 * 
 * @param {String} galleryName 
 * @param {JSON} response   
 * @returns {Action}
 */
function receiveGallery(response) {
  return {
    type: FETCH_GALLERY,
    status: STATUS.SUCCESS,
    payload: response.data.resources
  }
}

/**
 * 
 * @param {String} galleryName 
 * @param {Error} err   
 * @returns {Action}
 */
function galleryError(error) {
  return {
    type: FETCH_GALLERY,
    status: STATUS.FAIL,
    error
  }
}


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