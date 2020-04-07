import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Image, Transformation } from 'cloudinary-react';
import { loadImageProps } from '../../utils/imageContext';
import ImageToolbar from '../ImageToolbar/';
import ProductButton from '../Buttons/ProductButton/';
import { withLightbox } from '../HigherOrder/withLightbox';

import './detail.scss';

const ImageDetail = props => {
  const { imageList, imageIndex, displayHeight, displayWidth } = props;

  const [ currentImage, setCurrentImage ] = useState(null);
  useEffect(() => {
    setCurrentImage(imageList[imageIndex]);
  }, [imageList, imageIndex]); 

  const magnifyImage = () => {
    props.selectLightbox(currentImage.public_id, imageList);
  }

  if (currentImage) {

    const info = loadImageProps(currentImage);

    return (
      <Container className="image-detail">
        <Container className="image-view">
          <Image cloudName="cantimaginewhy" publicId={info.id} onClick={magnifyImage}>
            <Transformation height={displayHeight} width={displayWidth} crop="pad" background="black" />
          </Image>
        </Container>
        
        <ImageToolbar 
            variant="light"
            imgSize="2x"
            fullWidth
            prevImageFn={props.movePrevious}
            nextImageFn={props.moveNext}
            zoomImageFn={magnifyImage}
            disableCarousel={imageList.length < 2}
          />
        
          {info.hasContext && (
            <Container className="image-info">
              {info.forPrint && (
                <div style={{float: 'right'}}>
                  <ProductButton productKey={info.productKey} size="2x" />
                </div>
              )}
              <div className="title">{info.title}</div>
              <p className="mb-2 text-muted">{info.description}</p>
              {info.completed && (
                <div className="info completed-field">
                  <span className="label">Completed: </span>
                  <span className="data"><em>{info.dateCompleted.toDateString()}</em></span>
                </div>
              )}
              {info.location && (
                <div className="info location-field">
                  <span className="label">Location: </span>
                  <span className="data">{info.location}</span>
                </div>
              )}
              {info.materialInfo && (
                <div className="info material-field">
                  <span className="label">Material: </span>
                  <span className="data">{info.medium}, {info.size}</span>
                </div>
              )}
              {info.year && (
                <div className="info year-field">
                  <span className="label">Year: </span>
                  <span className="data">{info.year}</span>
                </div>
              )}
              {info.forSale && (
                <div className="info price-field">
                  <span className="label">Original: </span>
                  <span className="data">${info.price}</span>
                </div>
              )}
              
            </Container>
          )}
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
  /**
   * dimensions of display image
   */
  displayHeight: PropTypes.number,
  displayWidth: PropTypes.number
}

ImageDetail.defaultProps = {
  imageIndex: 0,
  displayHeight: 400,
  displayWidth: 600
}

export default withLightbox(ImageDetail);
