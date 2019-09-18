import axios from 'axios';
// import cloudinary from 'cloudinary';

const cloudName = 'cantimaginewhy';

const jsonImgList = tagName => {
  return `https://res.cloudinary.com/${cloudName}/image/list/${tagName}.json`;
}

// Return all JSON data of images tagged with tagName
export const fetchGallery = tagName => {
  const url = jsonImgList(tagName);
  return axios({
    method: 'GET',
    url
  });
}

// Return JSON data of all images where context.ref = keyName
export const fetchRelatedImages = keyName => {
  const url = `https://res.cloudinary.com/${cloudName}/image/context`;
  return axios({
    method: 'GET',
    url: url,
  });
}
