import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { PROGRESS_CONTEXT, MAIN_CONTEXT } from '../../utils/constants';
import { moveNext, movePrevious } from 'Utils/miscUtils';

const delegateContext = (state = INITIAL_STATE, context) => {
  switch (context) {
    case MAIN_CONTEXT:
      return {
        list: state.primaryGallery.imagesList,
        index: state.primaryGallery.currentIndex
      };
    case PROGRESS_CONTEXT:
      return {
        list: state.progressGallery.imagesList,
        index: state.progressGallery.currentIndex
      };
    default:
      return {
        list: state.featuredGallery.imagesList,
        index: state.featuredGallery.currentIndex
      };
    
  }
} 

export default (state = INITIAL_STATE, action) => {
  let ctx;
  if (action.context) {
    ctx = delegateContext(state, action.context);
  }
  switch (action.type) {
    case ACTIONS.OPEN_LIGHTBOX:
      return {
        ...state,
        lightbox: {
          isOpen: true,
          galleryContext: action.context
        }
      }
    case ACTIONS.CLOSE_LIGHTBOX:
      return {
        ...state,
        lightbox: {
          isOpen: false
        }
      }
    case ACTIONS.NEXT_IMAGE:
      let next = moveNext(ctx.list, ctx.index);
      switch (action.context) {
        case MAIN_CONTEXT:
          return {
            ...state.primaryGallery,
            currentIndex: next
          }
        case PROGRESS_CONTEXT:
          return {
            ...state.progressGallery,
            currentIndex: next
          }
        default:
          return {
            ...state.featuredGallery,
            currentIndex: next
          }; 
      }

    case ACTIONS.PREV_IMAGE:
      let prev = movePrevious(ctx.list, ctx.index);
      switch (action.context) {
        case MAIN_CONTEXT:
          return {
            ...state.primaryGallery,
            currentIndex: prev
          }
        case PROGRESS_CONTEXT:
          return {
            ...state.progressGallery,
            currentIndex: prev
          }
        default:
          return {
            ...state.featuredGallery,
            currentIndex: prev
          }; 
      }
      
    case ACTIONS.SELECT_IMAGE:
      let idx = action.index;
      switch (action.context) {
        case MAIN_CONTEXT:
          return {
            ...state.primaryGallery,
            currentIndex: idx
          }
        case PROGRESS_CONTEXT:
          return {
            ...state.progressGallery,
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
