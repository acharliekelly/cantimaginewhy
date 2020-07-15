import { combineReducers } from 'redux';
import * as ACTIONS from './actionTypes';


function primaryGallery (
  state = {
    isFetching: false,
    primaryImages: [],
    currentIndex: 0,
    error: null
  },
  action
) {
  switch (action.type) {
    case ACTIONS.SELECT_MODE:
      return Object.assign({}, state, {
        isFetching: false,
        mode: action.mode
      })
    case ACTIONS.SELECT_FILTER_MODE:
      return Object.assign({}, state, {
        isFetching: false,
        mode: action.mode,
        filterBy: action.filterBy
      })
    case ACTIONS.FETCH_GALLERY:
      switch (action.status) {
        case 'success':
          return Object.assign({}, state, {
            isFetching: false,
            selectedGallery: action.galleryName,
            primaryImages: action.images,
            currentIndex: action.index
          });
        case 'error':
          return Object.assign({}, state, {
            isFetching: false,
            error: action.error
          });
        default:
          return Object.assign({}, state, {
            isFetching: true
          });
      }
    case ACTIONS.SORT_GALLERY:
      return Object.assign({}, state, {
        isFetching: false,
        // TODO: sort gallery
      })
    case ACTIONS.SELECT_PRIMARY_IMAGE:
      return Object.assign({}, state, {
        currentIndex: action.index
      })
    default:
      return state;
  }
}

function associatedGallery(
  state = {
    isFetching: false,
    associatedImages: [],
    associatedIndex: 0,
    error: null
  },
  action
) {
  switch (action.type) {
    case ACTIONS.FETCH_ASSOC_IMAGES:
      switch (action.status) {
        case 'success':
          return Object.assign({}, state, {
            isFetching: false,
            associatedImages: action.images
          });
        case 'error':
          return Object.assign({}, state, {
            error: action.error
          });
        default:
          return Object.assign({}, state, {
            isFetching: true
          });
      }
    case ACTIONS.SELECT_ASSOC_IMAGE:
      return Object.assign({}, state, {
        associatedIndex: action.index
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  primaryGallery,
  associatedGallery
});

export default rootReducer;