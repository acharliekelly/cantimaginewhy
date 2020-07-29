import React from 'react';
import Container from 'react-bootstrap/Container';
import ImageToolbar from '../ImageToolbar/';
import { withLightbox } from '../higherOrder/withLightbox';
import DisplayImage from '../DisplayImage';
import ImageInfo from '../../containers/ImageInfo';
import classNames from 'classnames';

import './detail.scss';

const ImageDetail = props => {
  const { imageList, currentIndex, isFullWidth } = props;
  const { nextImage, prevImage, openLightbox } = props;

  const moveNext = () => nextImage(imageList, currentIndex);
  const movePrevious = () => prevImage(imageList, currentIndex);

  if (imageList[currentIndex]) {
    const cls = classNames('image-detail', { 'full-width': isFullWidth });
    return (
      <Container className={cls}>
        <DisplayImage 
          currentImage={imageList[currentIndex]} 
          imageZoom={isFullWidth ? null:  openLightbox} />
        
        <ImageToolbar 
            variant="light"
            imgSize="2x"
            fullWidth
            prevImageFn={movePrevious}
            nextImageFn={moveNext}
            zoomImageFn={isFullWidth ? null:  openLightbox}
            disableCarousel={imageList.length < 2}
            tagObject={props.tagObject}
          />
        
          <ImageInfo currentImage={imageList[currentIndex]} />

      </Container>    
    )
  } else {
    return (
      <div className="no-data"></div>
    )
  }
}

export default withLightbox(ImageDetail);
