import {
  FETCH_IMAGES_BY_TAG,
  FETCH_IMAGE_BY_ID
} from '../utils/Constants';

export const fetchImagesById = imageId => ({
  type: FETCH_IMAGE_BY_ID,
  id: imageId
});

export const fetchImagesByTag = tag => ({
  type: FETCH_IMAGES_BY_TAG,
  tag: tag
});

