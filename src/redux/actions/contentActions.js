import { STATUS } from '.';
import { 
  getContactLinks, 
  getAboutContent, 
  getContactContent
} from 'Utils/miscUtils';
import { getExplanation } from 'Utils/tagUtils';

import { 
  FETCH_LINKS, 
  FETCH_CONTENT_TEXT, 
  SELECT_SECTION,
  FETCH_GALLERY_ABOUT 
} from 'ActionTypes';

import { CONTACT_PAGE } from 'Constants';

function requestAboutGallery(galleryTag) {
  return {
    type: FETCH_GALLERY_ABOUT,
    status: STATUS.WAITING,
    galleryTag
  }
}

function receiveAboutGallery(response) {
  return {
    type: FETCH_GALLERY_ABOUT,
    status: STATUS.SUCCESS,
    payload: response
  }
}

function aboutGalleryError(error) {
  return {
    type: FETCH_GALLERY_ABOUT,
    status: STATUS.FAIL,
    error
  }
}

/**
 * 
 * @param {String} galleryTag 
 */
export function fetchAlbumExplanation(galleryTag) {
  return function(dispatch) {
    dispatch(requestAboutGallery(galleryTag));
    return getExplanation(galleryTag)
      .then(response =>
        dispatch(receiveAboutGallery(response))  
      )
      .catch(error =>
        dispatch(aboutGalleryError(error))  
      )
  }
}


// temporarily a local call
function requestContactLinks(sectionId) {
  return {
    type: FETCH_LINKS,
    status: STATUS.WAITING,
    sectionId
  }
}

function receiveContactLinks(response) {
  return {
    type: FETCH_LINKS,
    status: STATUS.SUCCESS,
    payload: response
  }
}

function contactLinksError(error) {
  return {
    type: FETCH_LINKS,
    status: STATUS.FAIL,
    error
  }
}


/**
 * 
 * @param {String} sectionId 
 */
export function fetchContactLinks(sectionId) {
  return function (dispatch) {
    dispatch(requestContactLinks(sectionId));
    return getContactLinks(sectionId)
      .then(response =>
        dispatch(receiveContactLinks(response))
      )
      .catch(err =>
        dispatch(contactLinksError(err))
      )
  }
}


// synchronous - assumes content is already cached
export function selectSection(page, sectionId) {
  return {
    type: SELECT_SECTION,
    page,
    sectionId
  }
}

function requestSectionContent(page, sectionId) {
  return {
    type: FETCH_CONTENT_TEXT,
    status: STATUS.WAITING,
    page,
    sectionId
  }
}

function receieveSectionContent(response) {
  return {
    type: FETCH_CONTENT_TEXT,
    status: STATUS.SUCCESS,
    payload: response
  }
}

function sectionContentError(error) {
  return {
    type: FETCH_CONTENT_TEXT,
    status: STATUS.FAIL,
    error
  }
}

function getContent(page, sectionId) {
  if (page === CONTACT_PAGE) {
    return getContactContent(sectionId);
  } else {
    return getAboutContent(sectionId);
  }
}


export function fetchSectionContent(page, sectionId) {
  return function (dispatch) {
    dispatch(requestSectionContent(page, sectionId));
    return getContent(page, sectionId)
      .then(response =>
        dispatch(receieveSectionContent(response))
      )
      .catch(error => 
        dispatch(sectionContentError(error))  
      )
  }
}