import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paddedImageSrc, lightboxImageSrc } from '../utils/imageApi';
import { purchaseOriginal, purchasePrint, purchasePoster } from '../utils/productApi';
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
      source: paddedImageSrc(this.props.currentImage.public_id, 600, 400),
      title: this.getPictureCaption(),
      description: this.getPictureProperty('alt'),
      location: this.getPictureProperty('location'),
      medium: this.getPictureProperty('medium'),
      size: this.getPictureProperty('size'),
      year: this.getPictureProperty('year'),
      forSale: (this.getPictureProperty('original') === 'available'),
      forPrint: true,
      moreStuff: true,
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

  handleProcess = ev => {
    ev.preventDefault();
    const imgId = this.props.currentImage.public_id;
    console.log('Show process photos for ' + imgId);
    // TODO: show process photos
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

            {info.forSale && (
              <div className="options">
                <span className="label">Buy Original:</span>
                  <a className="purchase buy-orig" href={purchaseOriginal(info.id)}>${info.price}</a>
              </div>
            )}
            {info.forPrint && (
              <div className="options">
                <span className="label">Buy a: </span>
                <a className="purchase buy-print" href={purchasePoster(info.id, 0)}>Poster</a>
                <a className="purchase buy-print" href={purchasePrint(info.id, 0)}>Print</a>
              </div>
            )}
            {info.moreStuff && (
              <div className="options">
                <span className="label">View Process:</span>
                <a className="purchase view-process" onClick={this.handleProcess} href="null">Photos</a>
              </div>
            )}
            
          </div>
          <div className="spacer" />

          {this.state.lightboxOpen && (
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
