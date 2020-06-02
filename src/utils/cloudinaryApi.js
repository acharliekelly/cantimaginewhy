import axios from 'axios';


// PUBLIC CONSTANTS 
export const cloudName = 'cantimaginewhy';



export const defaultCPI = 'question_mark';
export const defaultImg = `${defaultCPI}.jpg`;


// INTERNAL CONSTANTS
const copyrightText = 'Cant Imagine Why';

const addDefault = `d_${defaultCPI}.jpg/`;

const addCopyright = `l_text:courier_80_bold:${copyrightText},y_50,o_30/`;
const imgSrc = `https://res.cloudinary.com/${cloudName}/`;

const addCopyrightIf = publicId => publicId.startsWith('art/') ? addCopyright : '';

export const cloudUrl = imgSrc;

const jsonImgList = tagName => {
  return `https://res.cloudinary.com/${cloudName}/image/list/${tagName}.json`;
}


// Return all JSON data of images tagged with tagName
export const fetchGallery = tagName => {
  const url = jsonImgList(tagName);
  return axios(url).then(res => res.data.resources);
}

/**
 * Return source URL for non-watermarked image
 * @param {string} publicId
 * @param {int} wd  
 */
export const cleanImageSrc = (publicId, wd = 0) => {
  return getImageSrc(publicId, wd, false);
}

/**
 * Get cloudinary resource path, including copyright overlay if specified
 * @param {string} publicId 
 * @param {int} width 
 * @param {boolean} protect 
 */
export const getImageSrc = (publicId, width = 0, protect = true) => {
  let srcUrl = imgSrc + (width ? `w_${width}/` : '');
  if (protect && publicId.startsWith('art/')) {
    srcUrl += addCopyright;
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
  srcUrl += addCopyrightIf(publicId);
  srcUrl += addDefault;
  srcUrl += publicId + '.jpg';
  return srcUrl;
}

/**
 * Return a context field from CIO object
 * @param {object} cImage Cloudinary Image Object
 * @param {string} propertyName context field
 * @param {*} defaultValue value if field is missing
 */
export const getContextProperty = (cImage, propertyName, defaultValue = '') => {
  let val = defaultValue;
  try {
    val = cImage.context.custom[propertyName];
  } catch (err) {
    val = defaultValue;
  }
  return val;
}


/**
 * Get image for Parallax bkg (about page)
 * @param {string} publicId 
 */
export const parallaxImageSrc = (publicId) => {
  return cleanImageSrc(publicId)
 
}

