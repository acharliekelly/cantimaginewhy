import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from '.';
import { STATUS } from '../actions/';

export const navigator = {
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
  switch (action.type) {
    case ACTIONS.SELECT_MODE:
      return {
        ...state,
        mode: action.mode
      }

    case ACTIONS.SELECT_FILTER:
      return {
        ...state,
        mode: action.mode,
        filterIndex: action.filterIndex
      }

    case ACTIONS.SORT_GALLERY:
      return {
        ...state,
        selectedGallery: action.tagObj
      }

    case ACTIONS.CLEAR_GALLERY:
      return {
        ...state,
        selectedGallery: {},
        galleries: []
      }

    case ACTIONS.FETCH_GALLERY_GROUPS:
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
            galleryGroups: action.payload
          }
      }
      
    case ACTIONS.FETCH_GALLERIES:
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
            galleries: action.payload
          }
      }
      
    default:
      return state;
  }
}
