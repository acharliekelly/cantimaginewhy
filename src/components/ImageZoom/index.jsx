import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

/**
 * Lightbox wrapper component
 */
const ImageZoom = props => {
  // received from container
  const { mainImg, nextImg, prevImg, title, caption } = props;
  const { moveNext, movePrevious, closeLightbox } = props;

  return (
    <Lightbox 
        onCloseRequest={closeLightbox} 
        discourageDownloads
        clickOutsideToClose
        mainSrc={mainImg}
        nextSrc={nextImg}
        prevSrc={prevImg}
        onMoveNextRequest={moveNext}
        onMovePrevRequest={movePrevious}
        imageLoadErrorMessage={`Error loading "${title}" image: ${props.error.message}`}
        imageTitle={title}
        imageCaption={caption}
      />
  )

}

export default ImageZoom;
