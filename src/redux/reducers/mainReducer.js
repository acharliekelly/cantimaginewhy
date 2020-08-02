import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { StateLocator } from '../../utils/constants';
import { 
  nextIndex, 
  prevIndex, 
  delegateContext, 
  wrongStateError 
} from 'Utils/stateUtils';

//! TODO: make full tree update whenever nav or main image updates

// takes full tree
export default (state = INITIAL_STATE, action) => {
  if (state.locator !== StateLocator.ROOT) {
    wrongStateError(StateLocator.ROOT, state.locator);
  }
  
  let ctx;
  if (action.context) {
    ctx = delegateContext(state, action.context);
  }
  switch (action.type) {
    case ACTIONS.OPEN_LIGHTBOX:
      switch (action.context) {
        case StateLocator.PRIMARY_GALLERY:
          return {
            ...state.primaryGallery,
            isLightboxOpen: true
          };
        case StateLocator.PROGRESS_GALLERY:
          return {
            ...state.currentImage.progressGallery,
            isLightboxOpen: true
          };
        case StateLocator.FEATURED_GALLERY:
          return {
            ...state.featuredGallery,
            isLightboxOpen: true
          };
        default:
          return state;
      }
    case ACTIONS.CLOSE_LIGHTBOX:
      switch (action.context) {
        case StateLocator.PRIMARY_GALLERY:
          return {
            ...state.primaryGallery,
            isLightboxOpen: false
          };
        case StateLocator.progressGallery:
          return {
            ...state.currentImage.progressGallery,
            isLightboxOpen: false
          };
        case StateLocator.featuredGallery:
          return {
            ...state.featuredGallery,
            isLightboxOpen: false
          };
        default:
          return state;
      }
    case ACTIONS.NEXT_IMAGE:
      let next = nextIndex(ctx.imageList, ctx.currentIndex);
      switch (action.context) {
        case StateLocator.PRIMARY_GALLERY:
          return {
            ...state.primaryGallery,
            currentIndex: next
          }
        case StateLocator.PROGRESS_GALLERY:
          return {
            ...state.currentImage.progressGallery,
            currentIndex: next
          }
        case StateLocator.FEATURED_GALLERY:
          return {
            ...state.featuredGallery,
            currentIndex: next
          };
        default:
          return state; 
      }

    case ACTIONS.PREV_IMAGE:
      let prev = prevIndex(ctx.imageList, ctx.currentIndex);
      switch (action.context) {
        case StateLocator.PRIMARY_GALLERY:
          return {
            ...state.primaryGallery,
            currentIndex: prev
          }
        case StateLocator.PROGRESS_GALLERY:
          return {
            ...state.currentImage.progressGallery,
            currentIndex: prev
          }
        case StateLocator.FEATURED_GALLERY:
          return {
            ...state.featuredGallery,
            currentIndex: prev
          }; 
        default:
          return state;
      }
      
    case ACTIONS.SELECT_IMAGE:
      let idx = action.index;
      switch (action.context) {
        case StateLocator.PRIMARY_GALLERY:
          return {
            ...state.primaryGallery,
            currentIndex: idx
          }
        case StateLocator.PROGRESS_GALLERY:
          return {
            ...state.currentImage.progressGallery,
            currentIndex: idx
          }
        default:
          return {
            ...state.featuredGallery,
            currentIndex: idx
          }; 
      }

    default:
      return state;
  }
}
