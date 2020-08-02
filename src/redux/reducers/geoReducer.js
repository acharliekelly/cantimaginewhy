import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

// const geoData = {
//   available: false,
//   isFetching: false,
//   latitude: 0,
//   longitude: 0,
//   error: null
// };

export default (state = INITIAL_STATE.geoData, action) => {
  let gState = state;
  if (state.locator === StateLocator.ROOT) {
    gState = state.currentImage.geoData;
  } else if (state.locator !== StateLocator.GEO_DATA) {
    wrongStateError(StateLocator.GEO_DATA, state.locator);
  }

  switch (action.type) {
    case ACTIONS.FETCH_GEO_DATA:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...gState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...gState,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...gState,
            isFetching: false,
            available: (action.payload.length === 2),
            latitude: action.payload.lat,
            longitude: action.payload.lng
          }
      }
    default:
      return gState;
  }
}