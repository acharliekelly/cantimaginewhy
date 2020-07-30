
import * as ACTIONS from 'ActionTypes';
import { MAIN_CONTEXT } from 'Constants';

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
  selectMainImage,
  sortGallery,
  fetchMainGallery
} from './galleryActions';
import { 
  fetchProgressGallery,
  selectProgressImage
} from './progressActions';

// SYNCH

export function openLightbox(context) {
  return { 
    type: ACTIONS.OPEN_LIGHTBOX,
    context
  }
}
export function closeLightbox() {
  return { type: ACTIONS.CLOSE_LIGHTBOX }
}


export const STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  WAITING: 'WAITING'
}

/**
 * 
 * @param {int} index   
 * @returns {Action}
 */
export function selectImage(context, index) {
  return {
    type: context === MAIN_CONTEXT 
      ? ACTIONS.SELECT_PRIMARY_IMAGE 
      : ACTIONS.SELECT_ASSOC_IMAGE,
    index
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
  selectMainImage,
  sortGallery,
  fetchMainGallery,
  fetchProgressGallery,
  selectProgressImage
};
