import React from 'react';
import PropTypes from 'prop-types';
import { variableImageSrc } from '../utils/imageApi';

const ImageDisplay = () => {
  const { publicId, title, location, medium, size, year, forSale, 
    origPrice, handleClose } = this.props;
  return (
    <div className="image-view">
      <img alt="" src={variableImageSrc(publicId)} onClick={handleClose} />
      <div className="image-info">
        <div className="title">{title} ({year})</div>
        <div className="info">{location}</div>
        <div className="info">{medium}, {size}</div>
        {forSale && (
          <div className="info">${origPrice}</div>
        )}
      </div>
    </div>
  );
}

ImageDisplay.propTypes = {
  publicId: PropTypes.string.isRequired,
  title: PropTypes.string,
  location: PropTypes.string,
  medium: PropTypes.string,
  size: PropTypes.string,
  year: PropTypes.number,
  forSale: PropTypes.bool.isRequired,
  origPrice: PropTypes.number,
  handleClose: PropTypes.func.isRequired
};

export default ImageDisplay;
