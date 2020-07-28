import { combineReducers } from 'redux';

import * as ACTIONS from '../actions/actionTypes';

const INITIAL_STATE = {
  navigator: {
    mode: 'ALBUM',
    filter: 0,
    galleryTag: '',
    galleryText: ''
  },
  primaryGallery: {
    isFetching: false,
    imagesList: [],
    currentIndex: 0,
    imageDetail: {
      caption: '',
      description: '',
      medium: '',
      size: '',
      completedOn: Date.parse('2000-01-01'),
      location: ''
    },
    error: null
  },
  progressGallery: {
    isFetching: false,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  geoData: {
    available: false,
    coordinates: [0, 0]
  },
  productInfo: {
    original: false,
    derived: false
  }
};

const navigationReducer = (state = INITIAL_STATE.navigator, action) => {
  // TODO:
}

const primaryGalleryReducer = (
  state = INITIAL_STATE.primaryGallery, 
  action
) => {
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

const associatedGalleryReducer = (
  state = INITIAL_STATE.associatedGallery, 
  action
) => {
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
  navigationReducer,
  primaryGalleryReducer,
  associatedGalleryReducer
});

export default rootReducer;