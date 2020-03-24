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
  if (publicId.startsWith('art/')) {
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

/**
 * Return a context field from CIO object
 * @param {*} cImgObj Cloudinary Image Object
 * @param {*} propertyName context field
 * @param {*} defaultValue value if field is missing
 */
export const getContextProperty = (cImgObj, propertyName, defaultValue = '') => {
  let val = defaultValue;
  try {
    val = cImgObj.context.custom[propertyName];
  } catch (err) {
    val = defaultValue;
  }
  return val;
}



// GALLERY SORTING FUNCTIONS

const defaultYear = '2010';
const defaultTitle = 'Untitled';

const compareUploadDate = (a, b) => {
  // use Creation date
  const aDate = Date.parse(a.created_at);
  const bDate = Date.parse(b.created_at);
  return aDate - bDate;
}

const compareYear = (a, b) => {
  const aYear = getContextProperty(a, 'year', defaultYear);
  const bYear = getContextProperty(b, 'year', defaultYear);
  return aYear - bYear;
}

const compareTitle = (a, b) => {
  const aTitle = getContextProperty(a, 'caption', defaultTitle);
  const bTitle = getContextProperty(b, 'caption', defaultTitle);
  if (aTitle && bTitle)
    return aTitle.toLowerCase().localeCompare(bTitle.toLowerCase());
  else
    return compareFilename(a, b);
}

const compareFilename = (a, b) => {
  const aFile = a.public_id.split('/')[1];
  const bFile = b.public_id.split('/')[1];
  return aFile.localeCompare(bFile);
}

const compareAlbumOrder = (a, b) => {
  const aOrder = parseInt(getContextProperty(a, 'alb-order', 0));
  const bOrder = parseInt(getContextProperty(b, 'alb-order', 0));
  return aOrder - bOrder;
}

const comparePrice = (a, b) => {
  const aPrice = parseInt(getContextProperty(a, 'price', 0));
  const bPrice = parseInt(getContextProperty(b, 'price', 0));
  return aPrice - bPrice;
}

const compareLocation = (a, b) => {
  const aLoc = getContextProperty(a, 'location', 'z');
  const bLoc = getContextProperty(b, 'location', 'z');
  if (aLoc && bLoc)
    return aLoc.localeCompare(bLoc);
  else 
    return 0;
}

const defaultSortFn = compareUploadDate;


/**
 * Sorts gallery on field specified in sortField of album list
 * 
 * @param {string} fieldName string
 * @param {Array} gallery the fetched object list to sort
 */
export const sortByField = (gallery, fieldName) => {
  let sortFn = defaultSortFn;
  if (fieldName) {
    switch (fieldName) {
      case '.year':
        sortFn = compareYear;
        break;
      case '.caption':
        sortFn = compareTitle;
        break;
      case '.alb-order':
        sortFn = compareAlbumOrder;
        break;
      case '.price':
        sortFn = comparePrice;
        break;
      case '.location':
        sortFn = compareLocation;
        break;
      default:
        sortFn = compareFilename;
    }
  } else {
    sortFn = defaultSortFn;
  }

  return gallery.sort(sortFn);
}

/**
 * Sorts gallery on field specified in sortField of album list
 * 
 * @param {object} nav nav object from albums.js or filters.js
 * @param {Array} gallery the fetched object list to sort
 */
export const sortGallery = (nav, gallery) => {
  if (nav.sortField) {
    return sortByField(gallery, nav.sortField)
  } else {
    return sortByField(gallery);
  }
   
}

