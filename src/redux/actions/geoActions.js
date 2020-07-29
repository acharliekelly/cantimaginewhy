import { extractGeo } from '../../utils/geoUtils';
import FETCH_GEO_DATA from 'ActionTypes';
import { STATUS } from '.';


/**
 * 
 * @param {Array<float,float>} geoTag   
 * @returns {Action}
 */
function requestGeoData(geoTag) {
  return {
    type: FETCH_GEO_DATA,
    status: STATUS.WAITING,
    geoTag
  }
}

/**
 * 
 * @param {JSON} response 
 * @returns {Action}
 */
function receiveGeoData(response) {
  return {
    type: FETCH_GEO_DATA,
    status: STATUS.SUCCESS,
    payload: response.data
  }
}

/**
 * 
 * @param {Error} err 
 * @returns {Action}
 */
function geoDataError(error) {
  return {
    type: FETCH_GEO_DATA,
    status: STATUS.FAIL,
    error
  }
}


// THUNK

/**
 * 
 * @param {Array<decimal>} geoTag 
 */
export function fetchGeoData(geoTag) {
  return function (dispatch) {
    dispatch(requestGeoData(geoTag));
    return extractGeo(geoTag)
      .then(response => 
        dispatch(receiveGeoData(response))  
      )
      .catch(err =>
        dispatch(geoDataError(err))
      )
  }
}
