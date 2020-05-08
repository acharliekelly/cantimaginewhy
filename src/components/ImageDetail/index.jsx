import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ImageToolbar from '../ImageToolbar/';
import { withLightbox } from '../higherOrder/withLightbox';
import DisplayImage from '../DisplayImage';
import ImageInfo from '../ImageInfo';
import classNames from 'classnames';

import './detail.scss';

const ImageDetail = props => {
  const { imageList, imageIndex, isFullWidth, imageMovement } = props;
  const { moveNext, movePrevious } = imageMovement;

  const [ currentImage, setCurrentImage ] = useState(null);
  useEffect(() => {
    if (imageList)
      setCurrentImage(imageList[imageIndex]);
  }, [imageList, imageIndex]); 

  const magnifyImage = () => {
    props.selectLightbox(currentImage.public_id, imageList);
    
  }

  if (currentImage) {
    const cls = classNames('image-detail', { 'full-width': isFullWidth });
    return (
      <Container className={cls}>
        <DisplayImage currentImage={currentImage} imageZoom={isFullWidth ? null:  magnifyImage} {...props} />
        
        <ImageToolbar 
            variant="light"
            imgSize="2x"
            fullWidth
            prevImageFn={movePrevious}
            nextImageFn={moveNext}
            zoomImageFn={isFullWidth ? null:  magnifyImage}
            disableCarousel={imageList.length < 2}
          />
        
          <ImageInfo currentImage={currentImage} />

      </Container>    
    )
  } else {
    return (
      <div className="no-data"></div>
    )
  }
}

ImageDetail.propTypes = {
  /**
   * results of fetchGallery
   */
  imageList: PropTypes.array,
  /**
   * the starting index
   */
  imageIndex: PropTypes.number,
  /**
   * the function to move back
   */
  movePrevious: PropTypes.func,
  /**
   * the function to move forward
   */
  moveNext: PropTypes.func,
  imageMovement: PropTypes.object,
  /**
   * the function to open image in Zoom
   */
  selectLightbox: PropTypes.func,
}

ImageDetail.defaultProps = {
  imageIndex: 0,
}

export default withLightbox(ImageDetail);
