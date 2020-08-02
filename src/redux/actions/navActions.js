import { albums, albumModeDescription } from '../../json/albums';
import { filters, filterModeDescription } from '../../json/filters';
import {
  SELECT_MODE,
  SELECT_FILTER,
  SELECT_GALLERY,
  CLEAR_GALLERY,
  FETCH_GALLERIES,
  FETCH_GALLERY_GROUPS,
  FETCH_MODE_DESCRIPTION
 } from './actionTypes';
 import { STATUS } from '.';
 import { FILTER_MODE } from 'Constants';



 //! TODO: make these actions at least look like real fetch requests
function getGalleryGroups () {
  return filters;
}

function getFilters (index) {
  return filters[index].options
}

function getAlbums () {
  return albums;
}

function getModeDesc(mode) {
  if (mode === FILTER_MODE) {
    return filterModeDescription;
  } else {
    return albumModeDescription;
  }
}

function requestModeDescription(mode) {
  return {
    type: FETCH_MODE_DESCRIPTION,
    status: STATUS.WAITING,
    mode
  }
}

function receiveModeDescription(response) {
  return {
    type: FETCH_MODE_DESCRIPTION,
    status: STATUS.SUCCESS,
    response
  }
}

function modeDescriptionError(error) {
  return {
    type: FETCH_MODE_DESCRIPTION,
    status: STATUS.FAIL,
    error
  }
}

export function fetchModeDescription(mode) {
  return function(dispatch) {
    dispatch(requestModeDescription(mode));
    return getModeDesc(mode)
      .then(response => 
        dispatch(receiveModeDescription(response))  
      )
      .catch(error => 
        dispatch(modeDescriptionError(error))  
      )
  }
}


/**
 * 
 * @param {String} mode 
 * @returns {Action}
 */
export function selectMode(mode) {
  return {
    type: SELECT_MODE,
    mode
  }
}

/**
 * 
 * @param {String} category 
 * @returns {Action}
 */
export function selectFilter(filterIndex) {
  return {
    type: SELECT_FILTER,
    mode: FILTER_MODE,
    filter: filterIndex
  }
}

export function selectGallery(tagObj) {
  return {
    type: SELECT_GALLERY,
    tagObj
  }
}

export function clearGallery() {
  return {
    type: CLEAR_GALLERY
  }
}

function requestGalleries(mode, filterIndex) {
  return {
    type: FETCH_GALLERIES,
    status: STATUS.WAITING,
    mode,
    filterIndex
  }
}

function receiveGalleries(response) {
  return {
    type: FETCH_GALLERIES,
    status: STATUS.SUCCESS,
    payload: response
  }
}

function galleriesError(error) {
  return {
    type: FETCH_GALLERIES,
    status: STATUS.FAIL,
    error
  }
}

export function fetchGalleries(mode, filterIndex) {
  return function (dispatch) {
    dispatch(requestGalleries(mode, filterIndex));
    if (mode === FILTER_MODE) {
      return getFilters(filterIndex)
        .then(response => 
          dispatch(receiveGalleries(response))
        )
        .catch(err => galleriesError(err))
    } else {
      return getAlbums()
        .then(response =>
          dispatch(receiveGalleries(response))  
        )
        .catch(err => galleriesError(err))
    }
  }
}


function requestGalleryGroups() {
  return {
    type: FETCH_GALLERY_GROUPS,
    status: 'waiting'
  }
}

function receiveGalleryGroups(response) {
  return {
    type: FETCH_GALLERY_GROUPS,
    status: STATUS.SUCCESS,
    payload: response
  }
}

function galleryGroupError(error) {
  return {
    type: FETCH_GALLERY_GROUPS,
    status: STATUS.FAIL,
    error
  }
}


export function fetchGalleryGroups() {
  return function (dispatch) {
    dispatch(requestGalleryGroups());
    return getGalleryGroups()
      .then(response =>
        dispatch(receiveGalleryGroups(response))
      )
      .catch(err => galleryGroupError(err))
  }
}
