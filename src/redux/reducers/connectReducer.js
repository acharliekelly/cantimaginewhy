import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from '.';
import { STATUS } from '../actions/';

// const contactInfo = {
//   isFetching: false,
//   currentSectionId: '',
//   contentText: {
//     intro: '',
//     art: '',
//     design: '',
//     tech: ''
//   },
//   connectLinks: [],
//   error: null
// }

export default (state = INITIAL_STATE.contactInfo, action) => {
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
            contactText: action.payload
          }
      }
    case ACTIONS.FETCH_LINKS:
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
            connectLinks: action.payload
          }
      }
    case ACTIONS.SELECT_SECTION:
      return {
        ...state,
        isFetching: false,
        currentSection: action.payload
      }
    default:
      return state;
  }
}
