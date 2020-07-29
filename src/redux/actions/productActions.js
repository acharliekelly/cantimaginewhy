import { FETCH_PRODUCT_LIST } from 'ActionTypes';
import { STATUS } from '.';

/**
 * 
 * @param {String} productKey   
 * @returns {Action}
 */
export function requestProducts(productKey) {
  return {
    type: FETCH_PRODUCT_LIST,
    status: STATUS.WAITING,
    productKey
  }
}

/**
 * 
 * @param {JSON} response   
 * @returns {Action}
 */
export function receiveProducts(response) {
  return {
    type: FETCH_PRODUCT_LIST,
    status: STATUS.SUCCESS,
    payload: response.data.resources
  }
}

/**
 * 
 * @param {Error} err   
 * @returns {Action}
 */
export function productListError(error) {
  return {
    type: FETCH_PRODUCT_LIST,
    status: STATUS.FAIL,
    error
  }
}
