import * as ACTIONS from '../actions/actionTypes';
import { INITIAL_STATE } from './initialStateTree';
import { STATUS } from '../actions/';

export const productInfo = {
  isFetching: false,
  original: false,
  purchaseOriginalUrl: '',
  derivedProducts: false,
  productsUrl: '',
  error: null
}

export default (state = INITIAL_STATE.productInfo, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_PRODUCT_LIST:
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
            productsUrl: action.payload
          }
      }
    default:
      return state;
  }
}