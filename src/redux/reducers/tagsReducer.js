import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

export const otherGalleries = {
  locator: StateLocator.OTHER_GALLERIES,
  isFetching: false,
  tags: [],
  error: null
};


export default (state = INITIAL_STATE.otherGalleries, action) => {
  let tState = state;
  if (state.locator === StateLocator.ROOT) {
    tState = state;
  } else if (state.locator !== StateLocator.OTHER_GALLERIES) {
    wrongStateError(StateLocator.OTHER_GALLERIES, state.locator);
  }

  switch (action.type) {
    case ACTIONS.SELECT_TAG:
      return {
        ...tState,
        //! TODO: figure out what to do when this happens
        // TODO: probably expand new gallery
      }
    case ACTIONS.FETCH_OTHER_TAGS:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...tState,
            isFetching: true
          };
        case STATUS.FAIL:
          return {
            ...tState,
            isFetching: false,
            error: action.error
          };
        case STATUS.SUCCESS:
          return {
            ...tState,
            isFetching: false,
            error: null,
            tags: action.response
          }
        default:
          return tState;
      }
    default:
      return tState;
  } 
};