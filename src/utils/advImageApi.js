/*  SEARCH FUNCTIONS
 *
 * (Promisified)
 */
import axios from 'axios';
import cloudinary from 'cloudinary-core';

import cloudName from './imageApi';

const fetchImages = (keyName, callback, tag = '') => {
  let expr = `context.ref:${keyName} AND folder=photos`;
  if (tag !== '') {
    expr += ` AND tags=${tag}`;
  }
  cloudinary.v2.search
    .expression(expr)
    .with_field('context')
    .with_field('tags')
    .max_results(10)
    .execute().then(results => callback(results));
}

export const axiosFetchImages = (keyName, callback) => {
  // TODO: copy endpoint url from Cloudinary docs
  const url = `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${cloudName}/resources/search`;
  axios.get(url, {
    params: {
      expression: `context.ref:${keyName} AND folder=photos`,
      with_field: 'context',
      max_results: 20
    }
  }).then(function(response) {
    callback(response)
  }).catch(function(err) {
    console.error(err)
  })
}

// Return JSON data of all images where context.ref = keyName
export const fetchRelatedImages = (keyName, callback) => {
  fetchImages(keyName, callback);
}

// Only return Progress images
export const fetchProgressImages = (keyName, callback) => {
  fetchImages(keyName, callback, 'progress');
}

export const fetchViewImages = (keyName, callback) => {
  fetchImages(keyName, callback, 'view');
}

export const fetchFinalImage = (keyName, callback) => {
  fetchImages(keyName, callback, 'final');
}


// perform text search - returns Promise
export const textSearch = (searchStr, callback) => {
  return cloudinary.v2.search
    .expression(`${searchStr} AND folder=art`)
    .with_field('context')
    .with_field('tags')
    .max_results(50)
    .execute().then(response => callback(response));
}

// use context key
// callback(error, results)
export const imagesByContextKey = (keyName, callback) => {
  cloudinary.v2.api.resources_by_context(keyName, callback );
}

export const imagesForSale = callback => {
  imagesByContextKey('price', callback);
}

// retrieve all tags (for search AutoComplete)
export const allImageTags = callback => {
  cloudinary.v2.api.tags(
    function(error, result) {
      if (error) {
        console.error('problem getting tags: ', error);
      } else {
        console.log('tags: ', result);
        callback(result);
      }
    }
  )
}

// retrieve all info about image
export const getResourceInfo = publicId => {
  const info = { err: null, res: null };
  cloudinary.v2.api.resource(publicId,
      { 
        type: 'upload',
        max_results: 1
      },
      function(error, response) {
        if (error) {
          info.err = error;
          console.error('resource error: ', error);
        } else {
          info.res = response;
        }
      }
    )
    return info;
}
