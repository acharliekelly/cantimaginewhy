import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { zoomImageSrc, getContextProperty }from 'Api/cloudinaryApi';


/**
 * Lightbox wrapper component
 */
const ImageZoom = props => {
  const { imageList, currentIndex, moveNext, movePrevious } = props;
 
  const getTitle = () => {
    return getContextProperty(imageList[currentIndex], 'caption')
  }

  const getCaption = () => {
    return getContextProperty(imageList[currentIndex], 'alt');
  }

  return (
  <Lightbox 
      onCloseRequest={props.closeLightbox} 
      discourageDownloads
      clickOutsideToClose
      mainSrc={zoomImageSrc(imageList[currentIndex])}
      nextSrc={zoomImageSrc(imageList[(currentIndex + 1) % imageList.length])}
      prevSrc={zoomImageSrc(imageList[(currentIndex + imageList.length - 1) % imageList.length])}
      onMoveNextRequest={moveNext}
      onMovePrevRequest={movePrevious}
      imageLoadErrorMessage="..."
      imageTitle={getTitle()}
      imageCaption={getCaption()}
    />
  )

}

export default ImageZoom;
