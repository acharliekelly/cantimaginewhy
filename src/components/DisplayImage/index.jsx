import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Image, Transformation } from 'cloudinary-react';
import classNames from 'classnames';

import './style.scss';

const DEFAULT_IMG_HEIGHT = 400;
const DEFAULT_IMG_WIDTH = 600;

/**
 * Display just the image
 *  - takes currentImage prop
 * @param {*} props 
 */
const DisplayImage = props => {
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
   * the image data (json)
   */
  currentImage: PropTypes.object,

  /**
   * function to magnify image
   */
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


export default DisplayImage;
