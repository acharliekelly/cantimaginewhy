import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ImageToolbar from '../ImageToolbar/';
import { withLightbox } from '../higherOrder/withLightbox';
import { DisplayImage } from '../DisplayImage';
import ImageInfo from '../ImageInfo';

import './detail.scss';

const ImageDetail = props => {
  const { imageList, imageIndex } = props;

  const [ currentImage, setCurrentImage ] = useState(null);
  useEffect(() => {
    if (imageList)
      setCurrentImage(imageList[imageIndex]);
  }, [imageList, imageIndex]); 

  const magnifyImage = () => {
    props.selectLightbox(currentImage.public_id, imageList);
  }

  if (currentImage) {

    return (
      <Container className="image-detail">
        <DisplayImage currentImage={currentImage} imageZoom={magnifyImage} enabled />
        
        <ImageToolbar 
            variant="light"
            imgSize="2x"
            fullWidth
            prevImageFn={props.movePrevious}
            nextImageFn={props.moveNext}
            zoomImageFn={magnifyImage}
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
  imageList: PropTypes.array.isRequired,
  /**
   * the starting index
   */
  imageIndex: PropTypes.number.isRequired,
  /**
   * the function to move back
   */
  movePrevious: PropTypes.func.isRequired,
  /**
   * the function to move forward
   */
  moveNext: PropTypes.func.isRequired,
  /**
   * the function to open image in Zoom
   */
  selectLightbox: PropTypes.func.isRequired,
}

ImageDetail.defaultProps = {
  imageIndex: 0,
}

export default withLightbox(ImageDetail);
