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
