import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

export const primaryGallery = {
  isFetching: false,
  galleryAboutText: '',
  thumbSize: 80,
  imagesList: [],
  currentIndex: 0,
  sortField: '.completed',
  sortDir: 'desc',
  error: null
}

export default (state = INITIAL_STATE.primaryGallery, action) => {
  let pState = state;
  if (state.locator === StateLocator.ROOT) {
    pState = state.primaryGallery;
  } else if (state.locator !== StateLocator.PRIMARY_GALLERY) {
    wrongStateError(StateLocator.PRIMARY_GALLERY, state.locator);
  }
  switch (action.type) {
    case ACTIONS.SORT_GALLERY:
      // TODO: make this sort in immutable way
      return pState; 
    case ACTIONS.SELECT_PRIMARY_IMAGE:
      return {
        ...pState,
        currentIndex: action.index
      }
      
    case ACTIONS.FETCH_GALLERY_ABOUT:
      return {
        ...pState,
        galleryAboutText: action.payload
      }
    case ACTIONS.FETCH_GALLERY:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...pState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...pState,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...pState,
            isFetching: false,
            imagesList: action.payload
          }
      }
    default:
      return pState;
  }
}