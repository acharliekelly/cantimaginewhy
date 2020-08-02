
import * as ACTIONS from 'ActionTypes';
import { 
  fetchContactLinks, 
  fetchSectionContent, 
  fetchAlbumExplanation,
  selectSection  
} from './contentActions';
import {
  selectMode,
  selectFilter,
  selectGallery,
  clearGallery,
  fetchGalleryGroups,
  fetchGalleries,
  fetchModeDescription
} from 'Actions/navActions';
import { fetchGeoData } from './geoActions';
import {
  sortGallery,
  fetchMainGallery
} from './galleryActions';
import {
  fetchProductList
} from './productActions';
import { 
  fetchProgressGallery
} from './progressActions';
import { fetchOtherTags } from './tagsActions';



export const STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  WAITING: 'WAITING'
}

// SYNCH

export function openLightbox(context) {
  return { 
    type: ACTIONS.OPEN_LIGHTBOX,
    context
  }
}
export function closeLightbox(context) {
  return { 
    type: ACTIONS.CLOSE_LIGHTBOX,
    context 
  }
}



/**
 * 
 * @param {int} index   
 * @returns {Action}
 */
export function selectImage(context, index) {
  return {
    type: ACTIONS.SELECT_IMAGE,
    context,
    index
  }
}

export function nextImage(context) {
  return {
    type: ACTIONS.NEXT_IMAGE,
    context
  }
}

export function previousImage(context) {
  return {
    type: ACTIONS.PREV_IMAGE,
    context
  }
}

export {
  fetchContactLinks, 
  fetchSectionContent, 
  fetchAlbumExplanation,
  selectSection,
  selectMode,
  fetchModeDescription,
  selectFilter,
  selectGallery,
  clearGallery,
  fetchGalleryGroups,
  fetchGalleries,
  fetchGeoData,
  sortGallery,
  fetchMainGallery,
  fetchProgressGallery,
  fetchOtherTags,
  fetchProductList
};
