import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { zoomImageSrc, getImageSrc, getContextProperty }from 'Api/cloudinaryApi';


/**
 * Lightbox wrapper component
 */
const ImageZoom = props => {
  const [ images, setImages ] = useState([]);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { imageList, selectedIndex, selectedImageId } = props;

  useEffect(() => {
    setImages(imageList);
    setCurrentIndex(selectedIndex);
  }, [imageList, selectedIndex]);

  useEffect(() => {
    const src = getImageSrc(selectedImageId);
    setImages([src]);
    setCurrentIndex(0);
  }, [selectedImageId]);


  const moveNext = () => {
    if (images.length > 1) {
      const next = (currentIndex + 1) % images.length;
      setCurrentIndex(next)
    }
  }

  const movePrevious = () => {
    if (images.length > 1) {
      const prev = (currentIndex + images.length - 1) % images.length;
      setCurrentIndex(prev)
    }
  }

  const getTitle = () => {
    return getContextProperty(images[currentIndex], 'caption')
  }

  const getCaption = () => {
    return getContextProperty(images[currentIndex], 'alt');
  }

  if (images.length > 1) {
    // multiple images
    return (
      <Lightbox 
          onCloseRequest={props.closeLightbox} 
          discourageDownloads
          clickOutsideToClose
          mainSrc={zoomImageSrc(images[currentIndex])}
          nextSrc={zoomImageSrc(images[(currentIndex + 1) % images.length])}
          prevSrc={zoomImageSrc(images[(currentIndex + images.length - 1) % images.length])}
          onMoveNextRequest={moveNext}
          onMovePrevRequest={movePrevious}
          imageLoadErrorMessage="..."
          imageTitle={getTitle()}
          imageCaption={getCaption()}
        />
    )
  } else {
    // only 1 image
    return (
      <Lightbox 
          onCloseRequest={props.closeLightbox} 
          discourageDownloads
          clickOutsideToClose
          mainSrc={zoomImageSrc(images[0])}
          imageTitle={getTitle()}
          imageCaption={getCaption()}
          imageLoadErrorMessage="..."
        />
    )
  }

}

ImageZoom.propTypes = {
  /**
   * array of Cloudinary image objects
   */
  imageList: PropTypes.array,
  /**
   * currently selected index
   */
  selectedIndex: PropTypes.number,
  /**
   * the CPI of a single image, instead of array
   */
  selectedImageId: PropTypes.string,
  closeLightbox: PropTypes.func
}

export default ImageZoom;
