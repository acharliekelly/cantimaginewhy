import axios from 'axios';

const config = { 'Authorization': process.env.PRINTFUL_API_KEY };

export const getAllProducts = () => {
  return axios.get('https://api.printful.com/store/products', config);
}

export const getProductInfo = productId => {
  return axios.get(`https://api.printful.com/store/products/${productId}`, config);
}

// list of printful products
export const getProductsByImage = imageId => {
  // TODO: lookup the product
}

// return product?
const productLookup = (imageId, productType) => {
  // TODO: look up

}

export const createExistingProductOrder = (variant, recipient) => {

}

export const createNewProductOrder = (product, recipient) => {

}

// return URL (Amazon?)
export const purchaseOriginal = imageId => {
  console.log('get URL to buy original painting of "' + imageId + '"');
  // TODO: lookup
  // return productLookup(imageId, 0);
  return '';
}



export const purchasePoster = (imageId, optionNumber = 0) => {
  const productId = productLookup(imageId, optionNumber);
  console.log(`Request to purchase poster of product # ${productId}`);
  return 'https://'
}

export const purchasePrint = (imageId, optionNumber = 0) => {
  const productId = productLookup(imageId, optionNumber);
  console.log(`Request to purchase canvas print of product # ${productId}`);
  return 'https://'
}
