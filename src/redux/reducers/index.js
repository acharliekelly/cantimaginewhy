import { combineReducers } from 'redux';
import * as MODES from '../../utils/constants';
import * as ACTIONS from '../actions/actionTypes';

export const INITIAL_STATE = {
  viewPort: 1200,
  lightboxOpen: false,
  navigator: {
    isFetching: false,
    mode: MODES.ALBUM_MODE,
    filter: 0,
    galleries: [],
    selectedGallery: {
      name: '',
      tag: '',
      thumbnail: '',
      description: '',
      sortField: '.completed',
      sortDir: 'desc'
    },
    error: null
  },
  primaryGallery: {
    isFetching: false,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  imageDetail: {
    caption: '',
    description: '',
    medium: '',
    size: '',
    completedOn: Date.parse('2000-01-01'),
    location: '',
    referenceKey: ''
  },
  progressGallery: {
    isFetching: false,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  geoData: {
    available: false,
    isFetching: false,
    latitude: 0,
    longitude: 0,
    error: null
  },
  productInfo: {
    isFetching: false,
    original: false,
    purchaseOriginalUrl: '',
    derivedProducts: false,
    productsUrl: '',
    error: null
  },
  aboutInfo: {
    isFetching: false,
    currentSection: '',
    contentText: [],
    error: null
  },
  contactInfo: {
    isFetching: false,
    currentSection: '',
    contactText: '',
    connectLinks: [],
    error: null
  }
};

const navigationReducer = (state = INITIAL_STATE.navigator, action) => {
  // TODO:
}

const connectReducer = (state = INITIAL_STATE.contactInfo, action) => {
  // TODO:
}

const aboutReducer = (state = INITIAL_STATE.aboutInfo, action) => {
  // TODO:
}

const primaryReducer = (
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

const progressReducer = (
  state = INITIAL_STATE.progressGallery, 
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
};

const geoReducer = (state = INITIAL_STATE.geoData, action) => {
  // TODO:
}

const productReducer = (state = INITIAL_STATE.productInfo, action) => {
  // TODO:
}

const rootReducer = combineReducers({
  navigationReducer,
  primaryReducer,
  progressReducer,
  geoReducer,
  productReducer,
  connectReducer,
  aboutReducer
});

export default rootReducer;