import { getContextProperty, getImageSrc, cloudUrl } from './cloudinaryApi';

/**
 * Get thumbnail size based on image count
 * @param {int} listSize 
 */
export const getThumbnailSize = listSize => {
  let px = 0;
  if (listSize < 1) return px;
  if (listSize <= 9) {
    px = 100;
  } else if (listSize <= 24) {
    px = 90;
  } else if (listSize <= 36) {
    px = 80;
  } else if (listSize <= 48) {
    px = 70;
  } else {
    px = 60;
  }
  return px;
}

/**
 * Get (square) thumbnail size for container
 * @param {int} listSize 
 * @param {int} containerHeight 
 */
export const getThumbSize = (listSize, containerHeight) => {
  // TODO: calculate thumbnail size
}





// GALLERY SORTING FUNCTIONS

const defaultYear = '2010';
const defaultTitle = 'Untitled';

const getContextProps = (ab, propertyName, defaultValue) => {
  const [a, b] = ab;
  const aVal = getContextProperty(a, propertyName, defaultValue);
  const bVal = getContextProperty(b, propertyName, defaultValue);
  return [aVal, bVal];
}

const compareUploadDate = (a, b) => {
  // use Creation date
  const aDate = Date.parse(a.created_at);
  const bDate = Date.parse(b.created_at);
  return aDate - bDate;
}

const compareCompletedOn = (a, b) => {
  const [aStr, bStr] = getContextProps([a,b], 'completed', '2009-01-01');
  return Date.parse(aStr) - Date.parse(bStr);
}

const compareYear = (a, b) => {
  const [aYear, bYear] = getContextProps([a,b], 'year', defaultYear);
  return aYear - bYear;
}

const compareTitle = (a, b) => {
  const [aTitle,bTitle] = getContextProps([a,b], 'caption', defaultTitle);
  if (aTitle && bTitle)
    return aTitle.toLowerCase().localeCompare(bTitle.toLowerCase());
  else
    return compareFilename(a, b);
}

const compareFilename = (a, b) => {
  return a.public_id.localeCompare(b.public_id);
}

const compareAlbumOrder = (a, b) => {
  const [aOrder, bOrder] = getContextProps([a,b], 'alb-order', 0);
  return parseInt(aOrder) - parseInt(bOrder);
}

const comparePrice = (a, b) => {
  const [aPrice, bPrice] = getContextProps([a,b], 'price', 0);
  return parseInt(aPrice) - parseInt(bPrice);
}

const compareLocation = (a, b) => {
  const [aLoc, bLoc] = getContextProps([a,b], 'location', 'z');
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
      case '.completed':
        sortFn = compareCompletedOn;
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

const defSrcSetSizes = [ 256, 512, 768, 1024, 1280 ];

export const getSourceSet = (publicId, width, quality = 80, sizes = defSrcSetSizes) => {
  return sizes.filter(size => size <= width)
    .map(size => `${cloudUrl}f_auto,q_${quality},w_${size}/${publicId}.jpg ${size}w`)
    .join(', ')
}

export const getSourceSizes = (breakPoints, sizes = defSrcSetSizes) => {
  const arr = breakPoints.map((pt, idx) => `(max-width: ${pt}px) ${sizes[idx]}`)
  arr.push(sizes[-1] + 'px');
  return arr.join(', ');
}

export const getIdxSrc = (publicId, sizes, index) => {
  const width = sizes[index];
  return `${cloudUrl}f_auto,q_75,w_${width}/${publicId}.jpg`;
}



// GENERATE PHOTO ARRAY FOR MASONRY GALLERY
/**
 * formats resources array to suit photo-gallery component
 * format is: [
 *    src: <image url>,
 *    width: <pixel-width>,
 *    height: <pixel-height>
 * ]
 * @param {array} resources JSON (cloudinary response format)
 * @param {number} scale number less than 1, unless you want to make it bigger
 */
export const masonryImageArray = (resources, scale = 1) => {
  return resources.map(resource => ({
    src: getImageSrc(resource.public_id, Math.floor(resource.width * scale), false),
    width: resource.width * scale,
    height: resource.height * scale
  }))
}

// returns 2D array of zoom sizes [[w,h]]
export const imageZoomSizes = (cImage, initSizes) => {
  const factors = [];
  const maxHeight = cImage.height;
  const maxWidth = cImage.width;
  const [ startWidth, startHeight ] = initSizes;
  let width = startWidth, height = startHeight;
  do {
    const size = [width, height];
    factors.push(size);
    width += startWidth;
    height += startHeight;
  } while (width < maxWidth && height < maxHeight);
  return factors;
}
