/*  SEARCH FUNCTIONS
 *
 * (Promisified)
 */
import axios from 'axios';

import { cloudName } from './imageApi';



const searchApiUrl = () => {
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  return `https://${key}:${secret}@api.cloudinary.com/v1_1/${cloudName}/resources/search`;
}

export const fetchImages = (exprStr, maxResults = 20) => {
  const options = {
    url: searchApiUrl(),
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
      expression: exprStr,
      with_field: ['context', 'tags'],
      sort_by: [{'public_id': 'asc'}],
      max_results: maxResults
    }
  }
  return axios(options)
}


export const fetchProcessImages = (refKey) => {
  const expr = `context.ref=${refKey}`;
  return fetchImages(expr, 20);
}

export const fetchAlbum = (albumName) => {
  const expr = `context.album=${albumName}`;
  return fetchImages(expr, 50);
}

// same as fetchGallery, but returns other tags
export const fetchTagImages = (tagName) => {
  const expr = `tags:${tagName}`;
  return fetchImages(expr, 100);
}




