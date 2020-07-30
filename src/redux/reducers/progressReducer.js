import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';

export const progressGallery = {
  isFetching: false,
  thumbSize: 80,
  imagesList: [],
  currentIndex: 0,
  error: null
}

export default (state = INITIAL_STATE.progressGallery, action) => {
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