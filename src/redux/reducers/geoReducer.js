import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from '.';
import { STATUS } from '../actions/';

// const geoData = {
//   available: false,
//   isFetching: false,
//   latitude: 0,
//   longitude: 0,
//   error: null
// };

export default (state = INITIAL_STATE.geoData, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_GEO_DATA:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...state,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...state,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...state,
            isFetching: false,
            available: (action.payload.length === 2),
            latitude: action.payload.lat,
            longitude: action.payload.lng
          }
      }
    default:
      return state;
  }
}