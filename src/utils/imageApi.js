import axios from 'axios';
import cloudinary from 'cloudinary-core';

const cloudName = 'cantimaginewhy';

const jsonImgList = tagName => {
  return `https://res.cloudinary.com/${cloudName}/image/list/${tagName}.json`;
}

export const initCloudinary = () => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
}

// Return all JSON data of images tagged with tagName
export const fetchGallery = tagName => {
  const url = jsonImgList(tagName);
  return axios(url);
}

// Return JSON data of all images where context.ref = keyName
export const fetchRelatedImages = (keyName, callback) => {
  cloudinary.v2.search
    .expression(`context.ref:${keyName}`)
    .with_field('context')
    .with_field('tags')
    .max_results(10)
    .execute().then(results => callback(results));
}

// Return source URL for watermarked image
export const watermarkedImageSrc = publicId => {
  return `https://res.cloudinary.com/${cloudName}/w_1000/w_500,l_ck_logo,o_30/${publicId}.jpg`;
}

// Return source URL for non-watermarked image
export const cleanImageSrc = publicId => {
  return `https://res.cloudinary.com/${cloudName}/w_1000/${publicId}.jpg`;
}

// return source URL of arbitrary-sized, non-watermarked image
export const variableImageSrc = (publicId, imgWidthPx = 500) => {
  return `https://res.cloudinary.com/${cloudName}/w_${imgWidthPx}/${publicId}.jpg`;
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
