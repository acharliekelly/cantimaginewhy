import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { loadImageProps } from '../../utils/imageContext';
import ProductButton from '../Buttons/ProductButton/';
// import { Breakpoint } from 'react-socks';

import './style.scss';

const ImageInfo = props => {
  const { currentImage, currentImageProps } = props;
  let cImage;
  if (currentImage) {
    cImage = currentImage
  } else if (currentImageProps) {
    const { imageList, imageIndex } = currentImageProps;
    cImage = imageList[imageIndex];
  }

  if (cImage) {

    const info = loadImageProps(cImage);
    if (info.hasContext) {
      return (
        <Container className="image-info">
          {info.forPrint && (
            <div style={{float: 'right'}}>
              <ProductButton productKey={info.productKey} />
            </div>
          )}
          <div className="title">{info.title}</div>
          <p className="mb-2 text-muted">{info.description}</p>
          {/* {info.completed && (
            <div className="info completed-field">
              <span className="label">Completed: </span>
              <span className="data"><em>{info.dateCompleted.toDateString()}</em></span>
            </div>
          )} */}
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
      )
    }
  }

  return '';
}

ImageInfo.propTypes = {
  currentImage: PropTypes.object,
  currentImageProps: PropTypes.object
}

export default ImageInfo;
