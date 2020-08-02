// place to put functions that deal with state but 
// as far as I knowdon't belong anywhere else

import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { StateLocator } from './constants';


export const delegateBranch = (state = INITIAL_STATE, actionContext) => {
  if (state.locator === actionContext) {
    // this is the branch you wanted
    return state;
  } else if (state.locator === StateLocator.ROOT) {
    // this is the root; find the right branch
    switch (actionContext) {
      case StateLocator.ABOUT_INFO:
        return state.aboutInfo;
      case StateLocator.CONTACT_INFO:
        return state.contactInfo;
      case StateLocator.NAVIGATOR:
        return state.navigator;
      case StateLocator.FEATURED_GALLERY:
        return state.featuredGallery;
      case StateLocator.PRIMARY_GALLERY:
        return state.primaryGallery;
      case StateLocator.CURRENT_IMAGE:
        return state.currentImage;
      case StateLocator.IMAGE_DETAIL:
        return state.currentImage.imageDetail;
      case StateLocator.PROGRESS_GALLERY:
        return state.currentImage.progressGallery;
      case StateLocator.GEO_DATA:
        return state.currentImage.geoData;
      case StateLocator.PRODUCT_INFO:
        return state.currentImage.productInfo;
      default:
        return null;
    }
  }
  return null;
}

// just return next index number;
// no mutation or state change
export const nextIndex = (imageList, currentIndex) => {
  return (currentIndex + 1) % imageList.length;
}

export const prevIndex = (imageList, currentIndex) => {
  return (currentIndex + imageList.length -1) % imageList.length;
}

/**
 * 
 * @param {State} state a state, either root or branch
 * @returns {Gallery} the Gallery that has its lightbox open, or false
 */
export const hasLightboxOpen = state => {
  const { context } = state;
  if (context.endsWith('_GALLERY')) {
    // branch is a gallery, see if open
    return state.isLightboxOpen;
  } else if (context === StateLocator.ROOT) {
    // branch is root; loop through galleries
    return Object.values(state).filter(
      branch => branch.context.endsWith('_GALLERY')
    ).filter(gallery => gallery.isLightboxOpen)
  }
  return false;
}

export const wrongStateError = (expectedBranch, actualBranch) => {
  const message = `Expected ${expectedBranch} but received ${actualBranch}`;
  throw new Error(message);
}