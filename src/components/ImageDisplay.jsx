import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { variableImageSrc, watermarkedImageSrc } from '../utils/imageApi';
import { orderEmailLink } from '../utils/contactApi';
import 'react-image-lightbox/style.css';
import '../css/display.scss';

const ImageDisplay = props => {
  const [ lightboxOpen, setLightboxOpen ] = useState(false);

  const loadImageProperties = () => {
    const infoObj = {
      id: props.currentImage.public_id,
      source: variableImageSrc(props.currentImage.public_id, 600),
      title: getPictureCaption(),
      description: getPictureProperty('alt'),
      location: getPictureProperty('location'),
      medium: getPictureProperty('medium'),
      size: getPictureProperty('size'),
      year: getPictureProperty('year'),
      forSale: (getPictureProperty('original') === 'available'),
      price: getPictureProperty('price', 'NFS'),
      materialInfo: hasProperty('medium') && hasProperty('size'),
    }
    return infoObj;
  }

  const getPictureCaption = () => {
    return getPictureProperty('caption', 'Untitled');
  }

  const getPictureProperty = (property, errValue = '') => {
    const pictureObj = props.currentImage;
    let val;
    try {
      val = pictureObj.context.custom[property];
    } catch (err) {
      val = errValue;
    }
    return val;
  }

  const hasProperty = propertyName => {
    const pictureObj = props.currentImage;
    if (pictureObj.hasOwnProperty('context')) {
      return pictureObj.context.custom.hasOwnProperty(propertyName);
    } else {
      return false;
    }
  }

  // const handlePurchase = () => {
  //   const imgId = props.currentImage.public_id;
  //   props.purchaseItem(imgId);
  // }

  const openLightbox = () => {
    setLightboxOpen(true);
  }

  const closeLightbox = () => {
    setLightboxOpen(false);
  }

  if (props.currentImage) {
    const info = loadImageProperties();
    return (
      <div className="image-view">
        <img className="display-image" alt="" src={info.source} onClick={openLightbox} />
        <div className="image-info">
          <div className="title">{info.title}</div>
          <div className="info">{info.description}</div>
          {info.location && (
          <div className="info">
            <span className="label">Location: </span>
            <span className="data">{info.location}</span>
          </div>
          )}
          {info.year && (
          <div className="info">
            <span className="label">Year: </span>
            <span className="data">{info.year}</span>
          </div>
          )}
          {info.materialInfo && (
          <div className="info">
            <span className="label">Material: </span>
            <span className="data">{info.size}, {info.medium}</span>
          </div>
          )}
          {info.forSale && (
            <div className="options">
              <span className="label">Buy Original:</span>
              <a className="purchase buy-orig" href={orderEmailLink(info.id)}>${info.price}</a>
            </div>
          )}
        </div>
        
        {lightboxOpen && (
          <Lightbox 
            mainSrc={watermarkedImageSrc(props.currentImage.public_id)}
            onCloseRequest={closeLightbox}
          />
        )}
      </div>

    );
  } else {
    return (<div />)
  }
  
}

ImageDisplay.propTypes = {
  currentImage: PropTypes.object.isRequired,
  closeImageView: PropTypes.func,
  purchaseItem: PropTypes.func
}

export default ImageDisplay;
