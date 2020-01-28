import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { variableImageSrc, cleanImageSrc } from '../utils/imageApi';
import { orderEmailLink } from '../utils/contactApi';
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
      id: this.props.currentImage.public_id,
      source: variableImageSrc(this.props.currentImage.public_id, 600),
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

  handlePurchase = () => {
    const imgId = this.props.currentImage.public_id;
    this.props.purchaseItem(imgId);
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
    const { currentImage } = this.props;
    if (currentImage) {
      const info = this.loadImageProperties();
      return (
        <div className="image-view">
          <img className="display-image" alt="" src={info.source} onClick={this.openLightbox} />
          <div className="image-info">
            <div className="title">{info.title}</div>
            <div className="descript">{info.description}</div>
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
          
          {this.state.lightboxOpen && (
            <Lightbox 
              mainSrc={cleanImageSrc(currentImage.public_id)}
              onCloseRequest={this.closeLightbox}
              discourageDownloads
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
  closeImageView: PropTypes.func,
  purchaseItem: PropTypes.func
}

export default ImageDisplay;
