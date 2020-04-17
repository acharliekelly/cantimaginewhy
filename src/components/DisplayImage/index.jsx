import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Image, Transformation } from 'cloudinary-react';
import ImageToolbar from '../ImageToolbar';
import { withStacking } from '../higherOrder/withStacking';
import classNames from 'classnames';

import './style.scss';

const DEFAULT_IMG_HEIGHT = 400;
const DEFAULT_IMG_WIDTH = 600;

/**
 * Display just the image
 *  - takes currentImage prop
 * @param {*} props 
 */
export const DisplayImage = props => {
  const { displayHeight, displayWidth, bgColor, currentImage, enabled, imageZoom } = props;
  const viewCls = classNames('image-view', { 'enabled': enabled });
  return (
    <Container className={viewCls}>
      {currentImage && currentImage.public_id ? (
        <Image cloudName="cantimaginewhy" 
          publicId={currentImage.public_id}
          onClick={imageZoom}>
          <Transformation 
            height={displayHeight} 
            width={displayWidth} 
            crop="pad" 
            background={bgColor} />
        </Image>
      ) : (
        <div className="placeholder"  />
      )}
    </Container>
  )
}

DisplayImage.propTypes = {
  /**
   * the image (available from ImageDetail)
   */
  currentImage: PropTypes.object,

  imageZoom: PropTypes.func,
  
  /**
   * dimensions of display image
   */
  displayHeight: PropTypes.number,
  displayWidth: PropTypes.number,
  bgColor: PropTypes.string,
  enabled: PropTypes.bool,
  imgSource: PropTypes.string
}

DisplayImage.defaultProps = {
  displayHeight: DEFAULT_IMG_HEIGHT,
  displayWidth: DEFAULT_IMG_WIDTH,
  bgColor: 'black',
  enabled: false
};


/**
 * Display image and toolbar, as a stacked panel
 * - takes currentImageProps: {
 *    currentImage: { <cImageObj> },
 *    moveNext: func,
 *    movePrevious: func,
 *    zoom
 *    imageList: [<cImageObj>],
 *    imageIndex: int
 * }
 * @param {*} props 
 */
const DisplayImagePanel = props => {
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
        zoomText={` x ${zoomFactor}`}
        nextImageFn={moveNext}
        disableCarousel={galleryImages.length < 2}
      />
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
