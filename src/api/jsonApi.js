/**
 * Fake API, just pulls data from local JSON files;
 * but eventually this data will come from Fauna, so 
 * might as well use similar interface
 */

// import { albums } from './js/albums';
// import { filters } from './js/filters';
// import { links } from './js/links';
// import { geotags } from './json/locations';

import { ContentPages } from '../utils/constants';

const ALBUMS_DATA = './json/albums.json';
const FILTERS_DATA = './json/filters.json';
const LINKS_DATA = './json/connect-links.json';
const GEO_DATA = './json/locations.js';
const ABOUT_TEXT = './json/about-text.json';
const CONTACT_TEXT = './json/contact-text.json';
const GALLERY_INFO = './json/album-info.json';
const MODE_DESC = './json/mode-text.json';
const SECTIONS = './json/section-tabs.json';




export const fetchAlbums = () => {
  return fetch(ALBUMS_DATA);
};

export const fetchFilters = () => {
  return fetch(FILTERS_DATA);
}

export const fetchFilterGroups = () => {
  return fetch(FILTERS_DATA).then(groups => {
    groups.map((group, index) => ({
      name: group.name,
      description: group.description,
      groupIndex: index
    }))
  })
}

 export const fetchFilterOptions = filterIndex => {
   return fetchFilters()
    .then(groups => groups.filter(group => group.filterIndex === filterIndex))
 }

 export const fetchGalleryInfo = tagName => {
   return Promise.resolve(GALLERY_INFO[tagName]);
 };

export const fetchGeoData = publicId => {
  return Promise.resolve(GEO_DATA[publicId]);
}

export const fetchConnectLinks = () => {
  return Promise.resolve(LINKS_DATA);
}

export const fetchPageContent = page => {
  if (page === ContentPages.ABOUT_PAGE) {
    return Promise.resolve(ABOUT_TEXT);
  } else {
    return Promise.resolve(CONTACT_TEXT);
  }
}

export const fetchModeText = () => {
  return Promise.resolve(MODE_DESC);
}

export const fetchSectionTabs = () => {
  return fetch(SECTIONS);
}