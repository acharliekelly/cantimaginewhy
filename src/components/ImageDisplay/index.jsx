import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paddedImageSrc, lightboxImageSrc, axiosFetchImages } from '../../utils/imageApi';
// import { loadImageProps } from '../../utils/imageContext';
import  { faaAvailable, faaLookup } from '../../utils/fineArtApi';
import { OrderForm } from '../Contact';
import 'react-image-lightbox/style.css';
import './display.scss';

class ImageDisplay extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      lightboxOpen: false,
      orderFormOpen: false
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
      // processImgs: (this.getPictureProperty('key', '-') !== '-'),
      processImgs: false,
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
    ev.preventDefault();
    const key = this.props.currentImage.refKey;
    console.log('Show process photos with ref# ' + key);

    axiosFetchImages(key, response => {
      const processImages = response.data.resources;
      processImages.forEach(item => console.log(item));
    });
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

  render () {
    const { currentImage } = this.props;
    const { lightboxOpen, orderFormOpen } = this.state;
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
                  className="purchase buy-orig" 
                  href="/" 
                  onClick={this.showOrderForm}
                  >
                    ${info.price}
                </a>
              )}
              {!info.forSale && (
                <a 
                  className="purchase nfs" 
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
                  className="purchase buy-print" 
                  rel="noopener noreferrer" 
                  target="_blank" 
                  href={faaLookup(info.id)}
                  >Available</a>
              </div>
            )}
            {info.processImgs && (
              <div className="options">
                <span className="label">View Process:</span>
                <a className="purchase view-process" onClick={this.handleProcess} href="/">Photos</a>
              </div>
            )}
            {orderFormOpen && (
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

          {lightboxOpen && (
            <Lightbox 
              mainSrc={lightboxImageSrc(currentImage.public_id)}
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
  movePrevious: PropTypes.func.isRequired,
  moveNext: PropTypes.func.isRequired
}

export default ImageDisplay;
