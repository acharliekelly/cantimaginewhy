import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

export const progressGallery = {
  locator: StateLocator.PROGRESS_GALLERY,
  isFetching: false,
  thumbSize: 80,
  imagesList: [],
  currentIndex: 0,
  error: null
}

export default (state = INITIAL_STATE.progressGallery, action) => {
  let pState = state;
  if (state.locator === StateLocator.ROOT) {
    pState = state.currentIndex.progressGallery;
  } else if (state.locator !== StateLocator.PROGRESS_GALLERY) {
    wrongStateError(StateLocator.PROGRESS_GALLERY, state.locator);
  }
  
  switch (action.type) {
    case ACTIONS.SELECT_ASSOC_IMAGE:
      return {
        ...state,
        currentIndex: action.index
      }

    case ACTIONS.FETCH_ASSOC_IMAGES:
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
            imagesList: action.payload
          }
      }

    default:
      return state;
  }
}