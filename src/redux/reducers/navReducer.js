import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

export const navigator = {
  locator: StateLocator.NAVIGATOR,
  isFetching: false,
  mode: 'ALBUM_MODE',
  modeDescription: '',
  galleryGroups: [],
  filterIndex: 0,
  galleries: [],
  selectedGallery: {
    name: '',
    tag: '',
    thumbnail: '',
    description: '',
    sortField: '.completed',
    sortDir: 'desc',
  },
  error: null
};

export default (state = INITIAL_STATE.navigator, action) => {
  let nState = state;
  if (state.locator === StateLocator.ROOT) {
    nState = state.navigator;
  } else if (state.locator !== StateLocator.NAVIGATOR) {
    wrongStateError(StateLocator.NAVIGATOR, state.locator);
  }

  switch (action.type) {
    case ACTIONS.SELECT_MODE:
      return {
        ...nState,
        mode: action.mode
      }

    case ACTIONS.SELECT_FILTER:
      return {
        ...nState,
        mode: action.mode,
        filterIndex: action.filterIndex
      }

    case ACTIONS.SORT_GALLERY:
      return {
        ...nState,
        selectedGallery: action.tagObj
      }

    case ACTIONS.CLEAR_GALLERY:
      return {
        ...nState,
        selectedGallery: {},
        galleries: []
      }

    case ACTIONS.FETCH_GALLERY_GROUPS:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...nState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...nState,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...nState,
            isFetching: false,
            galleryGroups: action.payload
          }
      }
      
    case ACTIONS.FETCH_GALLERIES:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...nState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...nState,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...nState,
            isFetching: false,
            galleries: action.payload
          }
      }
      
    default:
      return nState;
  }
}
