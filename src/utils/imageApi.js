import axios from 'axios';
// import cloudinary from 'cloudinary-core';

export const cloudName = 'cantimaginewhy';

const protectionMode = 2; // copyright
const imgSrc = `https://res.cloudinary.com/${cloudName}/`;

const jsonImgList = tagName => {
  return `https://res.cloudinary.com/${cloudName}/image/list/${tagName}.json`;
}


// Return all JSON data of images tagged with tagName
export const fetchGallery = tagName => {
  const url = jsonImgList(tagName);
  return axios(url);
}

// Image URLs

export const defaultCPI = 'sample.jpg';


// Return source URL for watermarked image
export const watermarkedImageSrc = publicId => {
  return imgSrc + `w_1000/w_500,l_ck_logo,o_20/d_${defaultCPI}/${publicId}.jpg`;
}

export const copyrightImageSrc = (publicId) => {
  const copyright = `Cant Imagine Why`;
  return imgSrc + `w_1000/l_text:courier_80_bold:${copyright},y_50,o_30/d_${defaultCPI}/${publicId}.jpg`;
}

// Return source URL for non-watermarked image
export const cleanImageSrc = publicId => {
  return imgSrc + `w_1000/d_${defaultCPI}/${publicId}.jpg`;
}



// return source URL for lightbox, using current protectionMode
// (so we don't have to keep changing methods to add or remove watermark)
export const lightboxImageSrc = publicId => {
  if (publicId.startsWith('photos/')) {
    return cleanImageSrc(publicId);
  } else {
    switch (protectionMode) {
      case 1:
        return watermarkedImageSrc(publicId);
      case 2:
        return copyrightImageSrc(publicId);
      default:
        return cleanImageSrc(publicId);
    }
  }
  
}

// return source URL of arbitrary-sized, non-watermarked image
export const variableImageSrc = (publicId, imgWidthPx = 500) => {
  return imgSrc + `w_${imgWidthPx}/d_${defaultCPI}/${publicId}.jpg`;
}

// return source URL image, padded to fit height
export const paddedImageSrc = (publicId, width = 600, height = 400) => {
  return imgSrc + `w_${width},h_${height},c_pad,b_white/d_${defaultCPI}/${publicId}.jpg`;
}



// Advanced Image API Workaround
export const fetchAlbum = albumName => {
  console.log('fetchAlbum workaround')
  const images = [];
  fetchGallery('nfs').then(res => {

    images.push(res.data.resources)
  })
  fetchGallery('products').then(res => {
    images.push(res.data.resources)
  })
  console.log('total image count: ' + images.length);
  return images.filter(image => image.context.custom.album === albumName);
}
