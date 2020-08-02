import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';
import { StateLocator } from '../../utils/constants';
import { wrongStateError } from '../../utils/stateUtils';

export const productInfo = {
  locator: StateLocator.PRODUCT_INFO,
  isFetching: false,
  original: false,
  purchaseOriginalUrl: '',
  derivedProducts: false,
  productsUrl: '',
  error: null
}

export default (state = INITIAL_STATE.productInfo, action) => {
  let pState = state;
  if (state.locator === StateLocator.ROOT) {
    pState = state.productInfo;
  } else if (state.locator !== StateLocator.PRODUCT_INFO) {
    wrongStateError(StateLocator.PRODUCT_INFO, state.locator);
  }

  switch (action.type) {
    case ACTIONS.FETCH_PRODUCT_LIST:
      switch (action.status) {
        case STATUS.WAITING:
          return {
            ...pState,
            isFetching: true
          }
        case STATUS.FAIL:
          return {
            ...pState,
            isFetching: false,
            error: action.error
          }
        default:
          return {
            ...pState,
            isFetching: false,
            productsUrl: action.payload
          }
      }
    default:
      return pState;
  }
}