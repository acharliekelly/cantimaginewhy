import axios from 'axios';

const config = { 'Authorization': process.env.PRINTFUL_API_KEY };

export const getAllProducts = () => {
  return axios.get('https://api.printful.com/store/products', config);
}

export const getProductInfo = productId => {
  return axios.get(`https://api.printful.com/store/products/${productId}`, config);
}

export const createExistingProductOrder = (variant, recipient) => {

}

export const createNewProductOrder = (product, recipient) => {

}

// temporary methods
export const purchaseOriginal = imageId => {
  console.log('Request to purchase original painting of "' + imageId + '"');
}

export const purchasePoster = productId => {
  console.log(`Request to purchase poster of product # ${productId}`);
}

export const purchasePrint = productId => {
  console.log(`Request to purchase canvas print of product # ${productId}`);
}
