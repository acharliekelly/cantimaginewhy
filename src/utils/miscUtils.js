// miscUtils.js
// general utilities
import { links } from '../json/links';
import { aboutContent, contactText } from '../json/text';


const stubSelectLightbox = imageId => {
  // needed to pass something for method
  console.log('DEFAULT: open lightbox for ' + imageId)
  console.log('YOU NEED TO SET A LIGHTBOX FUNCTION FOR THIS COMPONENT');
}

export const selectLightboxUtil = (imageId, images = [], index = 0) => {
  // TODO: access to Lightbox without having to pass through every component from App
  if (images.length > 0) {
    console.log('using array')
    stubSelectLightbox(images[index].public_id);
  } else if (imageId) {
    if (typeof imageId === 'string') {
      console.log('using id: ', imageId)
      stubSelectLightbox(imageId);
    } else {
      console.log(`Received imageId arg of ${typeof imageId}:`, imageId);
    }
    
  } else {
    console.log('DID NOT RECEIVE IMAGE TO LOAD IN LIGHTBOX')
  }

  
}


export class CarouselWrapper {
  constructor (list, index) {
    this.imageList = list;
    this.index = index;
    console.log(`Array of ${list.length} images, starting with ${index}`);
  }

  currentImg = () => { return this.imageList[this.index] }

  moveNext = () => {
    const next = (this.index + 1) % this.imageList.length;
    this.index = next;
    console.log(' >>: ', this.currentImg());
  }

  movePrevious = () => {
    const prev = (this.index + this.imageList.length - 1) % this.imageList.length;
    this.index = prev;
    console.log(' <<: ', this.currentImg());
  }

  selectImage = imageId => {
    stubSelectLightbox(imageId);
  }
}



// moved from fineArtApi.js
const FAA_URL = 'https://charlie-kelly.pixels.com/';

export const faaUrl = productKey => {
  if (productKey) {
    return `${FAA_URL}featured/${productKey}-charlie-kelly.html`;
  } else {
    return FAA_URL;
  }
}

export const getContactLinks = sectionId => {
  return sectionId ? links.filter(link => link.groups.includes(sectionId)) : links;
}

export const getAboutContent = sectionId => {
  return sectionId ? aboutContent[sectionId] : aboutContent;
}

export const getContactContent = sectionId => {
  return sectionId ? contactText[sectionId] : contactText;
}

export const moveNext = (imageList, currentIndex) => {
  return (currentIndex + 1) % imageList.length;
}

export const morePrevious = (imageList, currentIndex) => {
  return (currentIndex + imageList.length -1) % imageList.length;
}


// ANOTHER MISCELLANEOUS FUNCTION
// (non-mutating version)
export const shuffleArray = array => {
  const newArray = Array.from(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}


// 
const connectBreakpoints = [
  {
    max: 2000,
    min: 1321,
    size: '2x',
    textSize: '2em',
    displayType: 'full'
  },
  {
    max: 1320,
    min: 751,
    size: 'lg',
    textSize: '1em',
    displayType: 'both'
  },
  {
    max: 750,
    min: 361,
    size: 'sm',
    textSize: '0.8em',
    displayType: 'both'
  },
  {
    max: 360,
    min: 2,
    size: 'xs',
    textSize: '1em',
    displayType: 'icon'
  },
  {
    max: 1,
    min: 0,
    size: '2x',
    textSize: '2em',
    displayType: 'full'
  }
];
// Links properties
export const getLinkBreakpointProps = compWidth => {
   return connectBreakpoints.find(point => point.max >= compWidth && point.min <= compWidth)
}

