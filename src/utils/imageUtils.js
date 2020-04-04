// imageUtils.js
// general image utilities



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

const stubMoveNext = () => {
  console.log('move forward')
}

const stubMovePrevious = () => {
  console.log('move back')
}

export const moveNextUtil = () => {
  stubMoveNext();
}

export const movePreviousUtil = () => {
  stubMovePrevious();
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


// ANOTHER MISCELLANEOUS FUNCTION
export const shuffleArray = array => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
