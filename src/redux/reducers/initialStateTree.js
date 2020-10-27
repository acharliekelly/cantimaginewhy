import { NavigationModes, StateLocator } from '../../utils/constants';

export const imageSortFields = {
  DATE_COMPLETED: 'completed',
  PUBLIC_ID: 'public_id',
  TITLE: 'caption'
}

// shape of gereric gallery
export const Gallery = () => ({
  locator: 'SOME_GALLERY',
  isLightboxOpen: false,
  isFetching: false,
  galleryAboutText: '',
  thumbSize: 80,
  imagesList: [],
  currentIndex: 0,
  sortField: 'completed',
  sortDesc: true,
  error: null
});

export const GalleryCluster = () => ({
  id: 'ALBUM_LIST',
  isLightboxOpen: false,
  isFetching: false,
  galleryAboutText: '',
  thumbSize: 80,
  galleriesList: [],
  currentIndex: 0,
  sortField: 'completed',
  sortDesc: true,
  error: null
});



export const INITIAL_STATE = {
  locator: StateLocator.ROOT,
  lightboxOpen: null,
  view: {
    locator: StateLocator.VIEW,
    portWidth: 1200,
    displaySize: 'xl'
  },
  navigator: {
    locator: StateLocator.NAVIGATOR,
    isFetching: false,
    mode: NavigationModes.ALBUM_MODE,
    modeName: 'Albums',
    modeDescription: '',
    galleryGroups: [],
    filterIndex: 0,
    galleryList: [],
    currentIndex: 0,
    thumbSize: 80,
    error: null
  },
  selectedAlbum: {
    name: '',
    tag: '',
    thumbnail: '',
    description: '',
    sortField: '.completed',
    sortDesc: true,
  },
  featuredGallery: {  // home page gallery
    locator: StateLocator.FEATURED_GALLERY,
    isLightboxOpen: false,
    isFetching: false,
    thumbSize: 100,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  logoGallery: {
    locator: StateLocator.LOGO_GALLERY,
    isLightboxOpen: false,
    isFetching: false,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  primaryGalleryInfo: {
    locator: StateLocator.GALLERY_INFO,
    galleryName: '',
    galleryAboutText: '',
  },
  primaryGallery: {   // main content
    locator: StateLocator.PRIMARY_GALLERY,
    isLightboxOpen: false,
    isFetching: false,
    thumbSize: 80,
    imagesList: [],
    currentIndex: 0,
    sortField: 'completed',
    sortDesc: true,
    error: null
  },
  currentImage: {
    locator: StateLocator.CURRENT_IMAGE,
    rawData: {
      "public_id": "",
      "version": 0,
      "format": "jpg",
      "width": 0,
      "height": 0,
      "type": "upload",
      "created_at": "",
      "context": {
        "custom": {
          "album": "",
          "alt": "",
          "caption": "",
          "key": "",
          "location": "",
          "geotag": "0.0,0.0",
          "medium": "",
          "original": "",
          "price": 0,
          "size": "",
          "year": ""
        }
      }
    },
    relatedGalleries: {
      locator: StateLocator.RELATED_GALLERIES,
      isLightboxOpen: false,
      isFetching: false,
      thumbSize: 60,
      galleryList: [],
      currentIndex: 0,
      error: null
    },
    progressGallery: {    // photos of work in progress
      locator: StateLocator.PROGRESS_GALLERY,
      isLightboxOpen: false,
      isFetching: false,
      thumbSize: 60,
      imagesList: [],
      currentIndex: 0,
      error: null
    },
    geoData: {
      locator: StateLocator.GEO_DATA,
      available: false,
      isFetching: false,
      latitude: 0,
      longitude: 0,
      error: null
    },
    productInfo: {
      locator: StateLocator.PRODUCT_INFO,
      isFetching: false,
      original: false,
      originalPrice: 0.0,
      derivedProducts: [],
      productsUrl: '',
      error: null
    },
  },
  aboutInfo: {
    locator: StateLocator.ABOUT_INFO,
    isFetching: false,
    currentSectionId: '',
    contentText: {
      intro: [],
      art: [],
      design: [],
      tech: []
    },
    error: null
  },
  contactInfo: {
    locator: StateLocator.CONTACT_INFO,
    isFetching: false,
    currentSectionId: '',
    contentText: {
      intro: [],
      art: [],
      design: [],
      tech: []
    },
    connectLinks: [],
    error: null
  }
};
