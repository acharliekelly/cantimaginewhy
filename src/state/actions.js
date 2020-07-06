// action types
export const SELECT_NAVIGATION_MODE = 'SELECT_NAVIGATION_MODE';  // mode (tag || filter)

export const SELECT_GALLERY = 'SELECT_GALLERY'; // tagName


export const SORT_GALLERY = 'SORT_GALLERY';  // sortField, sortDir

export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE'; // deviceType (desktop || mobile || ?)

export const SELECT_IMAGE = 'SELECT_IMAGE';

export const OPEN_LIGHTBOX = 'OPEN_LIGHTBOX';
export const CLOSE_LIGHTBOX = 'CLOSE_LIGHTBOX';

export const MAGNIFY_IMAGE = 'MAGNIFY_IMAGE';
export const RESET_IMAGE = 'RESET_IMAGE';



export const NavigationMode = {
  BY_TAG: 'BY_TAG',
  BY_FILTER: 'BY_FILTER'
};

// action creators

/**
 * 
 * @param {NavigationMode} mode 
 */
export const selectNavigationMode = mode => {
  return { type: SELECT_NAVIGATION_MODE, mode };
}

/**
 * 
 * @param {GalleryItem} gallery 
 */
export const selectGallery = gallery => {
  return { type: SELECT_GALLERY, gallery };
}

export const sortGallery = sortField => {
  return { type: SORT_GALLERY, sortField };
}

/**
 * 
 * @param {ImageItem} imageId 
 */
export const selectImage = imageId => {
  return { type: SELECT_IMAGE, imageId };
}



export const openLightbox = imageId => {
  return { type: OPEN_LIGHTBOX, imageId };
}

export const closeLightbox = imageId => {
  return { type: CLOSE_LIGHTBOX, imageId };
}

