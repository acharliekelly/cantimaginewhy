import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paddedImageSrc } from '../../utils/imageApi';
import  { faaAvailable, faaLookup } from '../../utils/fineArtApi';
import { OrderForm } from '../OrderForm/';
import ProgressGallery from '../ProgressGallery/';

import './display.scss';

class ImageDisplay extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      orderFormOpen: false,
      processOpen: false
    }
  }

  loadImageProperties = () => {
    const infoObj = {
      id: this.props.currentImage.public_id,
      source: paddedImageSrc(this.props.currentImage.public_id, 600, 400),
      title: this.getPictureCaption(),
      description: this.getPictureProperty('alt'),
      location: this.getPictureProperty('location'),
      medium: this.getPictureProperty('medium'),
      size: this.getPictureProperty('size'),
      year: this.getPictureProperty('year'),
      forSale: (this.getPictureProperty('original') === 'available'),
      forPrint: (faaAvailable(this.props.currentImage.public_id)),
      refKey: this.getPictureProperty('key', '-'),
      processImgs: (this.getPictureProperty('key', '-') !== '-'),
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

  suppressLink = ev => {
    ev.preventDefault();
  }


  handleProcess = ev => {
    
    const refKey = this.getPictureProperty('key', '');
    console.log('Open images for: ' + refKey);
    ev.preventDefault();
  }

  openLightbox = () => {
    const { currentImage, selectLightbox } = this.props;
    selectLightbox(currentImage.public_id);
  }


  showOrderForm = ev => {
    ev.preventDefault();
    this.setState({
      orderFormOpen: true
    })
  }

  hideOrderForm = ev => {
    ev.preventDefault();
    this.setState({
      orderFormOpen: false
    })
  }

  toggleOrderForm = ev => {
    const { orderFormOpen } = this.state;
    this.setState({
      orderFormOpen: !orderFormOpen
    })
    ev.preventDefault();
  }

  showProcessImages = () => {
    this.setState({ processOpen: true })
  }

  hideProcessImages = () => {
    this.setState({ processOpen: false })
  }

  toggleProcessImages = e => {
    const { processOpen } = this.state;
    this.setState({
      processOpen: !processOpen
    })
    e.preventDefault();
  }

  render () {
    const { currentImage, selectLightbox } = this.props;
    const { orderFormOpen, processOpen } = this.state;
    if (currentImage) {
      const info = this.loadImageProperties();
      return (
        <div className="image-box">
          <div className="image-nav-btn prev-btn" onClick={this.props.movePrevious}>
            <FontAwesomeIcon icon="chevron-circle-left" size="lg" />
          </div>
          <div className="image-view">
            <img className="display-image" alt="" src={info.source} onClick={this.openLightbox} />
          </div>
          <div className="image-nav-btn next-btn" onClick={this.props.moveNext}>
            <FontAwesomeIcon icon="chevron-circle-right" size="lg" />
          </div>

          <div className="spacer" />
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

            
            <div className="options">
              <span className="label">Original:</span>
              {info.forSale && (
                <a 
                  className="feature buy-orig" 
                  href="/" 
                  onClick={this.showOrderForm}
                  >
                    ${info.price}
                </a>
              )}
              {!info.forSale && (
                <a 
                  className="feature nfs" 
                  href="/" 
                  onClick={this.suppressLink}
                >
                  Sold
                </a>
              )}
            </div>
            {info.forPrint && (
              <div className="options">
                <span className="label">Prints: </span>
                <a 
                  className="feature buy-print" 
                  rel="noopener noreferrer" 
                  target="_blank" 
                  href={faaLookup(info.id)}
                  >Available</a>
              </div>
            )}
            { info.processImgs && (
              <div className="options">
                <a href="/" className="feature view-process" onClick={this.toggleProcessImages}>Process</a>
                {processOpen && (
                    <ProgressGallery 
                      refKey={info.refKey} 
                      imageHeight={60}
                      selectLightbox={selectLightbox} 
                    />
                )}
                
              </div>
            )}
            {(orderFormOpen && info.forSale) && (
              <div className="form">
                <a className="close-btn" href="/" onClick={this.hideOrderForm}>X</a>
                <OrderForm 
                  className="inner-form"
                  imageId={info.id}
                  price={info.price}
                  closeForm={this.hideOrderForm}
                />
              </div>
            )}
          </div>
          <div className="spacer" />

        </div>

      );
    } else {
      return (<div />)
    }
    
    
  }
  
}

ImageDisplay.propTypes = {
  currentImage: PropTypes.object.isRequired,
  movePrevious: PropTypes.func.isRequired,
  moveNext: PropTypes.func.isRequired,
  selectLightbox: PropTypes.func
}

export default ImageDisplay;
