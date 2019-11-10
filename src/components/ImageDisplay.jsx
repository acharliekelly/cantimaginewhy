import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { variableImageSrc, watermarkedImageSrc } from '../utils/imageApi';

import 'react-image-lightbox/style.css';
import '../css/display.scss';

class ImageDisplay extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      lightboxOpen: false
    }
  }

  loadImageProperties = () => {
    const infoObj = {
      source: variableImageSrc(this.props.currentImage.public_id, 400),
      title: this.getPictureCaption(),
      description: this.getPictureProperty('alt'),
      location: this.getPictureProperty('location'),
      medium: this.getPictureProperty('medium'),
      size: this.getPictureProperty('size'),
      year: this.getPictureProperty('year'),
      forSale: (this.getPictureProperty('original') === 'available'),
      price: this.getPictureProperty('price', 'NFS'),
      materialInfo: this.hasProperty('medium') && this.hasProperty('size'),
    }
    return infoObj;
  }

  getPictureCaption = () => {
    return this.getPictureProperty('caption', 'Untitled');
  }

  getPictureProperty = (property, errValue = '') => {
    const pictureObj = this.props.currentImage;
    let val;
    try {
      val = pictureObj.context.custom[property];
    } catch (err) {
      val = errValue;
    }
    return val;
  }

  hasProperty = propertyName => {
    const pictureObj = this.props.currentImage;
    if (pictureObj.hasOwnProperty('context')) {
      return pictureObj.context.custom.hasOwnProperty(propertyName);
    } else {
      return false;
    }
  }

  handleBuyPrint = () => {
    const canvasId = this.state.canvasId;
    this.props.purchaseItem('canvas', canvasId);
  }

  handleBuyPoster = () => {
    const { posterId } = this.state;
    this.props.purchaseItem('poster', posterId);
  }

  handleBuyOriginal = () => {
    const id = this.props.currentImage.public_id;
    this.props.purchaseItem('orig', id);
  }

  openLightbox = () => {
    this.setState({
      lightboxOpen: true
    })
  }

  closeLightbox = () => {
    this.setState({
      lightboxOpen: false
    })
  }

  render () {
    const { currentImage, closeImageView } = this.props;
    if (currentImage) {
      const info = this.loadImageProperties();
      return (
        <div className="image-view">
          <img className="display-image" alt="" src={info.source} />
          <div className="image-info">
            <div className="title">{info.title}</div>
            <div className="info">{info.description}</div>
            {info.materialInfo && (
              <div className="info">{info.size}, {info.medium}</div>
            )}
            {info.forSale && (
              <div className="options">
                <span className="label">Buy Original:</span>
                <span className="purchase buy-orig" 
                onClick={this.handleBuyOriginal}>${info.price}</span>
              </div>
            )}
            <div className="buttons">
              <span className="zoom-btn" onClick={this.openLightbox}>Zoom</span>
              <span className="close-btn" onClick={closeImageView}>Close</span>
            </div>
          </div>
          
          {this.state.lightboxOpen && (
            <Lightbox 
              mainSrc={watermarkedImageSrc(currentImage.public_id)}
              onCloseRequest={this.closeLightbox}
            />
          )}
        </div>

      );
    } else {
      return (<div />)
    }
    
    
  }
  
}

ImageDisplay.propTypes = {
  currentImage: PropTypes.object.isRequired,
  closeImageView: PropTypes.func.isRequired,
  purchaseItem: PropTypes.func
}

export default ImageDisplay;
