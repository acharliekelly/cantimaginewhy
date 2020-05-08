import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ImageToolbar from '../ImageToolbar';
import ImageInfo from '../ImageInfo';
import DisplayImage from '.';
import { withStacking } from '../higherOrder/withStacking';

import './style.scss';

const DEFAULT_IMG_HEIGHT = 400;
const DEFAULT_IMG_WIDTH = 600;


/**
 * Display image and toolbar, as a stacked panel
 * - takes currentImageProps: {
 *    currentImage: { <cImageObj> },
 *    moveNext: func,
 *    movePrevious: func,
 *    zoom: func
 *    imageList: [<cImageObj>],
 *    imageIndex: int
 * }
 * @param {*} props 
 */
export const DisplayImagePanel = props => {
  const { imageMovement, galleryImages, imageIndex } = props;
  const { moveNext, movePrevious } = imageMovement;
  const [ zoomFactor, setZoomFactor ] = useState(1);

  const wStep = DEFAULT_IMG_WIDTH;
  const hStep = DEFAULT_IMG_HEIGHT;
  const maxFactor = 5;

  const increaseZoom = () => {
    const next = (zoomFactor + 1) % maxFactor;
    setZoomFactor(next || 1);
  }

  
  return (
    <Container className="image-detail">
      <DisplayImage 
        currentImage={galleryImages[imageIndex]} 
        enabled={zoomFactor > 1} 
        bgColor="black"
        displayHeight={hStep * zoomFactor}
        displayWidth={wStep * zoomFactor}
        />

      <ImageToolbar 
        variant="dark"
        imgSize="2x"
        fullWidth
        prevImageFn={movePrevious}
        zoomImageFn={increaseZoom}
        // zoomText={` x ${zoomFactor}`}
        nextImageFn={moveNext}
        disableCarousel={galleryImages.length < 2}
      />

      <ImageInfo currentImage={galleryImages[imageIndex]} />
    </Container>
  )
}

DisplayImagePanel.propTypes = {
  /**
   * the image, plus all image-related props
   */
  currentImageProps: PropTypes.object
};

DisplayImagePanel.defaultProps = {
  displayHeight: 400,
  displayWidth: 600,
  bgColor: 'transparent'
};

export default withStacking(DisplayImagePanel);
