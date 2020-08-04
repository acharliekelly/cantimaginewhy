import React from 'react';
import Container from 'react-bootstrap/Container';
import ImageToolbar from '../ImageToolbar/';
import { withLightbox } from '../higherOrder/withLightbox';
import DisplayImage from '../DisplayImage';

import './detail.scss';

const ImageDetail = props => {
  const { imageList, currentIndex } = props;
  const { nextImage, prevImage, openLightbox } = props;

  const moveNext = () => nextImage(imageList, currentIndex);
  const movePrevious = () => prevImage(imageList, currentIndex);

  if (imageList[currentIndex]) {
    return (
      <Container className="current-image">
        <DisplayImage 
          currentImage={imageList[currentIndex]} 
          imageZoom={openLightbox} />
        
        <ImageToolbar 
            variant="light"
            imgSize="2x"
            fullWidth
            prevImageFn={movePrevious}
            nextImageFn={moveNext}
            zoomImageFn={openLightbox}
            disableCarousel={imageList.length < 2}
            tagObject={props.tagObject}
          />

      </Container>    
    )
  } else {
    return (
      <div className="no-data"></div>
    )
  }
}

export default withLightbox(ImageDetail);
