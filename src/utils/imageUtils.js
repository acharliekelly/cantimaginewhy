// imageUtils.js
// general image utilities



const stubSelectLightbox = imageId => {
  // needed to pass something for method
  console.log('open lightbox for ' + imageId)
}

export const selectLightboxUtil = imageId => {
  // TODO: access to Lightbox without having to pass through every component from App
  return stubSelectLightbox(imageId);
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
