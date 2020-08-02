import * as ACTIONS from './actionTypes';
import { STATUS } from './';
import { fetchTagsFromArtwork } from '../../api/faunaApi';


function requestOtherTags(imageId) {
  return {
    type: ACTIONS.FETCH_OTHER_TAGS,
    status: STATUS.WAITING,
    imageId
  }
}

function receiveOtherTags(response) {
  return {
    type: ACTIONS.FETCH_OTHER_TAGS,
    status: STATUS.SUCCESS,
    response
  }
}

function otherTagError(error) {
  return {
    type: ACTIONS.FETCH_OTHER_TAGS,
    status: STATUS.FAIL,
    error
  }
}

export function fetchOtherTags(publicId) {
  return function (dispatch) {
    dispatch(requestOtherTags(publicId));
    return fetchTagsFromArtwork(publicId)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveOtherTags(json))
      )
      .catch(err =>
        dispatch(otherTagError(err))  
      )
  }
}