import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

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
  let cState = state;
  if (state.locator === StateLocator.ROOT) {
    cState = state.contactInfo;
  } else if (state.locator !== StateLocator.CONTACT_INFO) {
    // throws error, halts application
    wrongStateError(StateLocator.CONTACT_INFO, state.locator);
  }
  switch (action.type) {
    case ACTIONS.FETCH_CONTENT_TEXT:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...cState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...cState,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...cState,
            isFetching: false,
            contactText: action.payload
          }
      }
    case ACTIONS.FETCH_LINKS:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...cState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...cState,
            isFetching: false,
            error: action.error
          }
        case STATUS.SUCCESS:
          return {
            ...cState,
            isFetching: false,
            connectLinks: action.payload
          }
        default:
          return cState;
      }
    case ACTIONS.SELECT_SECTION:
      return {
        ...cState,
        isFetching: false,
        currentSectionId: action.sectionId
        }
    default:
      return cState;
  }
}
