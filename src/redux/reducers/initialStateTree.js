import { ALBUM_MODE, MAIN_CONTEXT } from 'Constants';

export const INITIAL_STATE = {
  view: {
    portWidth: 1200,
    displaySize: 'xl'
  },
  lightbox: {
    isOpen: false,
    galleryContext: MAIN_CONTEXT
  },
  navigator: {
    isFetching: false,
    mode: ALBUM_MODE,
    modeDescription: '',
    galleryGroups: [],
    filterIndex: 0,
    galleries: [],
    thumbSize: 80,
    selectedGallery: {
      name: '',
      tag: '',
      thumbnail: '',
      description: '',
      sortField: '.completed',
      sortDir: 'desc',
    },
    error: null
  },
  featuredGallery: {
    isFetching: false,
    thumbSize: 100,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  primaryGallery: {
    isFetching: false,
    galleryAboutText: '',
    thumbSize: 80,
    imagesList: [],
    currentIndex: 0,
    sortField: 'completed',
    sortDir: 'desc',
    error: null
  },
  imageDetail: {
    caption: '',
    description: '',
    medium: '',
    size: '',
    completedOn: Date.parse('2000-01-01'),
    location: '',
    referenceKey: ''
  },
  progressGallery: {
    isFetching: false,
    thumbSize: 60,
    imagesList: [],
    currentIndex: 0,
    error: null
  },
  geoData: {
    available: false,
    isFetching: false,
    latitude: 0,
    longitude: 0,
    error: null
  },
  productInfo: {
    isFetching: false,
    original: false,
    purchaseOriginalUrl: '',
    derivedProducts: false,
    productsUrl: '',
    error: null
  },
  aboutInfo: {
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
    isFetching: false,
    currentSectionId: '',
    contentText: {
      intro: '',
      art: '',
      design: '',
      tech: ''
    },
    connectLinks: [],
    error: null
  }
};
