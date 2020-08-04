import React from 'react';
import PropTypes from './prop-types';
import Gallery from 'react-photo-gallery';
import { masonryImageArray } from '/utils/imageUtils';

const MasonGallery = props => {
  const { galleryImages, scaleFactor } = props;
  const images = masonryImageArray(galleryImages, scaleFactor);
  console.log('gallery images: ', images);
  return (
    <Gallery photos={images} />
  )
};

MasonGallery.propTypes = {
  /**
   * the image array (results of fetchGallery)
   */
  galleryImages: PropTypes.array.isRequired,
  /**
   * what to do when image is selected
   */
  selectThumbnail: PropTypes.func,
  /**
   * index
   */
  imageIndex: PropTypes.number,
  /**
   * amount to scale images (if used, should be < 1)
   */
  scaleFactor: PropTypes.number
};

MasonGallery.defaultProps = {
  galleryImages: [],
  imageIndex: 0,
  scaleFactor: 1
}

export default MasonGallery;
