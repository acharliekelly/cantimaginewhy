import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from '.';
import { STATUS } from '../actions/';

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
  switch (action.type) {
    case ACTIONS.FETCH_CONTENT_TEXT:
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
            currentSectionId: action.sectionId,
            contentText: {
              ...state.contactInfo.contentText,
              [action.sectionId]: action.payload
            }
          }
      }
    case ACTIONS.SELECT_SECTION:
      return {
        ...state,
        isFetching: false,
        currentSectionId: action.sectionId
      }
    default:
      return state;
  }
}