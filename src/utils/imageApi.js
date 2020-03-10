import axios from 'axios';
// import cloudinary from 'cloudinary-core';

export const cloudName = 'cantimaginewhy';

export const ImageProtectMode = {
  unspecified: -1,
  clean: 0,
  watermarked: 1,
  copyright: 2
}

const protectionMode = ImageProtectMode.copyright;

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

export const defaultCPI = 'question_mark';
export const defaultImg = `${defaultCPI}.jpg`;
const copyrightText = 'Cant Imagine Why';

const addWatermark = 'w_500,l_ck_logo,o_20/';
const addCopyright = `l_text:courier_80_bold:${copyrightText},y_50,o_30/`;

const addProtect = publicId => {
  if (!publicId.startsWith('photos/')) {
    if (protectionMode === ImageProtectMode.watermarked) {
      return addWatermark;
    } else {
      return addCopyright;
    }
  } else {
    return '';
  }
}

const addDefault = `d_${defaultCPI}.jpg/`;

// const wResponsive = 'w_auto,c_scale/';



// Return source URL for watermarked image
export const watermarkedImageSrc = publicId => {
  return imgSrc + `w_1000/w_500,l_ck_logo,o_20/d_${defaultCPI}/${publicId}.jpg`;
}

export const copyrightImageSrc = (publicId) => {
  const copyright = `Cant Imagine Why`;
  return imgSrc + `w_1000/l_text:courier_80_bold:${copyright},y_50,o_30/d_${defaultCPI}/${publicId}.jpg`;
}


/**
 * Return source URL for non-watermarked image
 * @param {string} publicId 
 */
export const cleanImageSrc = publicId => {
  return imgSrc + `w_1000/d_${defaultCPI}/${publicId}.jpg`;
}



/**
 * Return source URL for lightbox, using value of protectionMode
 * 
 * Lightbox component takes image source as string, so 
 * can't use Cloudinary Image component
 * @param {string} publicId
 */
export const lightboxImageSrc = publicId => {
  if (publicId.startsWith('photos/')) {
    return cleanImageSrc(publicId);
  } else {
    switch (protectionMode) {
      case ImageProtectMode.watermarked:
        return watermarkedImageSrc(publicId);
      case ImageProtectMode.copyright:
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

export const responsiveImageSrc = publicId => {
  return imgSrc + `w_auto,c_scale/d_${defaultCPI}/${publicId}.jpg`;
}

export const getImageSrc = (publicId, width = 1000, protect = true) => {
  let srcUrl = imgSrc + `w_${width}/`;
  if (protect) {
    srcUrl += addProtect(publicId);
  }
  
  srcUrl += addDefault + publicId + '.jpg';
  return srcUrl;
} 

/**
 * Return source URL for lightbox
 * but take JSON object instead of just publicId
 * and adjust for aspect ratio
 * @param {object} imgObj 
 */
export const zoomImageSrc = imgObj => {
  if (!imgObj) {
    return defaultImg;
  }

  // check if already a CPI string
  if (typeof imgObj === 'string') {
    return getImageSrc(imgObj);
  }

  const publicId = imgObj.public_id;
  const width = imgObj.width;
  const height = imgObj.height;
  
  let srcUrl = imgSrc;
  if (width > height) {
    // landscape
    srcUrl += 'w_1000/';
  } else if (height > width) {
    // portrait
    srcUrl += 'h_800/'
  } else {
    // square
    srcUrl += 'w_800/';
  }
  srcUrl += addProtect(publicId);
  srcUrl += addDefault;
  srcUrl += publicId + '.jpg';
  return srcUrl;
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
