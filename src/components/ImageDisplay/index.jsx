import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { selectLightboxUtil, moveNextUtil, movePreviousUtil } from '../../utils/imageUtils';
import  { faaAvailable, faaLookup } from '../../utils/fineArtApi';
import { isSeriesExist } from '../../utils/onsiteUtils';
import { lookupSeriesCount } from '../../utils/processUtils';
import { OrderForm } from '../OrderForm/';
import ProgressGallery from '../ProgressGallery/';

import './display.scss';

// TODO: break this up into smaller components!

class ImageDisplay extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      orderFormOpen: false,
      processImageId: null
    }
  }

  loadImageProperties = () => {
    const imgId = this.props.currentImage.public_id;
    const ref = this.getPictureProperty('key', '-');
    const infoObj = {
      id: imgId,
      title: this.getPictureCaption(),
      description: this.getPictureProperty('alt'),
      location: this.getPictureProperty('location'),
      medium: this.getPictureProperty('medium'),
      size: this.getPictureProperty('size'),
      year: this.getPictureProperty('year'),
      forSale: (this.getPictureProperty('original') === 'available'),
      forPrint: (faaAvailable(imgId)),
      refKey: ref,
      processImgs: isSeriesExist(ref),
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

  openLightbox = () => {
    const { currentImage, selectLightbox } = this.props;
    selectLightbox(currentImage.public_id);
  }

  setProcessImage = image => {
    // console.log('setting process image: ' + image)
    this.setState({
      processImageId: image
    })
  }

  closeProcess = ev => {
    this.setState({
      processImageId: null
    })
    ev.preventDefault()
  }

  nextProcessImage = ev => {
    // TODO: move to next image via ProgressGallery
    const { processImageId } = this.state;
    const refKey = processImageId.split('-')[1];
    const imgOrder = processImageId.split('-')[2];
    
    let strNext = '0';
    if (imgOrder.length === 1) { // imgOrder is a number
      const nMax = lookupSeriesCount(refKey);
      const nNext = parseInt(imgOrder) + 1;
      if (nNext <= nMax) {
        strNext = nNext.toString();
      } else {
        strNext = 'final';
      }
    } // else imgOrder is 'final', so next should be '0'
    
    const nextImageId = `photos/onsite-${refKey}-${strNext}`;
    this.setProcessImage(nextImageId);

    ev.stopPropagation(); // prevent parent from closing image
  }


  showOrderForm = ev => {
    ev.preventDefault();
    this.setState({
      orderFormOpen: true,
      processOpen: false
    })
  }

  hideOrderForm = ev => {
    ev.preventDefault();
    this.setState({
      orderFormOpen: false
    })
  }

  toggleOrderForm = ev => {
    ev.preventDefault();
    const { orderFormOpen } = this.state;
    this.setState({
      orderFormOpen: !orderFormOpen,
      processOpen: false
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.currentImage !== this.props.currentImage) {
      this.setState({
        orderFormOpen: false,
        processImageId: null
      })
    }
  }

  render () {
    const { currentImage } = this.props;
    const { orderFormOpen, processImageId } = this.state;
    if (currentImage) {
      const info = this.loadImageProperties();
      return (
        <CloudinaryContext cloudName="cantimaginewhy">
          <div className="image-box">
            <div className="image-nav-btn prev-btn" onClick={this.props.movePrevious}>
              <FontAwesomeIcon icon="chevron-circle-left" size="lg" />
            </div>
            <div className="image-view">
              <Image 
                className="display-image"
                publicId={info.id}
                width="600"
                height="400"
                crop="pad"
                onClick={this.openLightbox}
              />
              {processImageId && (
                <div 
                  className="process-image"
                  onClick={this.closeProcess}
                >
                  <Image 
                    publicId={processImageId}
                    onClick={this.nextProcessImage}
                    width="400"
                    height="250"
                    crop="pad"
                    background="black"
                  />

                </div>

              )}
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
                  <span className="label">Derived Products: </span>
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
                  <ProgressGallery 
                    refKey={info.refKey} 
                    imageHeight={60}
                    selectImage={this.setProcessImage} 
                  />
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
        </CloudinaryContext>
      );
    } else {
      return (<div />)
    }
    
    
  }
  
}

ImageDisplay.propTypes = {
  /**
   * the selected Cloudinary image object
   */
  currentImage: PropTypes.object.isRequired,
  /**
   * the function to move back
   */
  movePrevious: PropTypes.func.isRequired,
  /**
   * the function to move forward
   */
  moveNext: PropTypes.func.isRequired,
  /**
   * the function to open image in Lightbox
   */
  selectLightbox: PropTypes.func.isRequired
}

ImageDisplay.defaultProps = {
  currentImage: null,
  selectLightbox: selectLightboxUtil,
  moveNext: moveNextUtil,
  movePrevious: movePreviousUtil
}

export default ImageDisplay;
