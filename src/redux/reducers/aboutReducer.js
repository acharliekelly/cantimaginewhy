import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

// const aboutInfo = {
//   isFetching: false,
//   currentSectionId: '',
//   contentText: {
//     intro: [],
//     art: [],
//     design: [],
//     tech: []
//   },
//   error: null
// }

export default (state = INITIAL_STATE.aboutInfo, action) => {
  let aState = state;
  if (state.locator === StateLocator.ROOT) {
    aState = state.aboutInfo;
  } else if (state.locator !== StateLocator.ABOUT_INFO) {
    wrongStateError(StateLocator.ABOUT_INFO, state.locator);
  }
  switch (action.type) {
    case ACTIONS.FETCH_CONTENT_TEXT:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...aState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...aState,
            isFetching: false,
            error: action.error
          }
        case STATUS.SUCCESS:
          return {
            ...aState,
            isFetching: false,
            currentSectionId: action.sectionId,
            contentText: {
              ...aState.contentText,
              [action.sectionId]: action.payload
            }
          }
        default:
          return state;
      }
    case ACTIONS.SELECT_SECTION:
      return {
        ...aState,
        isFetching: false,
        currentSectionId: action.sectionId
      }
    default:
      return state;
  }
}