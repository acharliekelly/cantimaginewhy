import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from '.';
import { STATUS } from '../actions/';
// import { sortByField } from '../../utils/imageUtils';

export const primaryGallery = {
  isFetching: false,
  thumbSize: 80,
  imagesList: [],
  currentIndex: 0,
  sortField: '.completed',
  sortDir: 'desc',
  error: null
}

export default (state = INITIAL_STATE.primaryGallery, action) => {
  switch (action.type) {
    case ACTIONS.SORT_GALLERY:
      //! TODO: make this sort in immutable way
      return state; 
    case ACTIONS.SELECT_PRIMARY_IMAGE:
      return {
        ...state,
        currentIndex: action.index
      }
    case ACTIONS.FETCH_GALLERY:
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