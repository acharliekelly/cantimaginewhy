import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from '.';

export default (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
}
