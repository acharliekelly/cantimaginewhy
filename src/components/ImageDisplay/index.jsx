import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowButton } from '../Buttons';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { selectLightboxUtil, moveNextUtil, movePreviousUtil } from '../../utils/imageUtils';
import  { faaLookup } from '../../utils/fineArtApi';
import { onsitePhotos } from '../../utils/onsiteUtils';
import { nextImageId, previousImageId } from '../../utils/processUtils';
import { loadImageProps } from '../../utils/imageContext';
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

  suppressLink = ev => {
    ev.preventDefault();
  }

  /**
   * Open main image in Zoom
   */
  openLightbox = () => {
    const { currentImage, selectLightbox, imageList } = this.props;
    const imgId = currentImage.public_id;
    if (imageList) {
      selectLightbox(imgId, imageList);
    } else {
      selectLightbox(imgId);
    }
  }

  /**
   * Open process image in Zoom
   */
  processLightbox = ev => {
    
    const { selectLightbox } = this.props;
    const { processImageId } = this.state;
    if (processImageId) {
      const refKey = processImageId.split('-')[1];
      onsitePhotos(refKey).then(series => {
        selectLightbox(processImageId, series)
      })
    }
    ev.stopPropagation();
  }

  setProcessImage = image => {
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
    
    const nextId = nextImageId(processImageId);
    this.setProcessImage(nextId);

    ev.stopPropagation(); // prevent parent from closing image
  }

  previousProcessImage = ev => {
    // TODO: move to prev image via ProgressGallery
    const { processImageId } = this.state;
    
    const prevId = previousImageId(processImageId);
    this.setProcessImage(prevId);

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
    const { currentImage, moveNext, movePrevious } = this.props;
    const { orderFormOpen, processImageId } = this.state;
    if (currentImage) {
      const info = loadImageProps(currentImage);
      return (
        <CloudinaryContext cloudName="cantimaginewhy">
          <div className="image-box">
            <div className="image-nav-btn prev-btn" onClick={movePrevious}>
              {/* <FontAwesomeIcon icon="chevron-circle-left" size="lg" /> */}
              <ArrowButton direction="left" />
            </div>
            <div className="image-view">
              {/* Main image */}
              <Image 
                className="display-image"
                publicId={info.id}
                width="600"
                height="400"
                crop="pad"
                onClick={this.openLightbox}
              />
              {/* Process Images */}
              {processImageId && (
                <div 
                  className="process-image"
                  onClick={this.closeProcess}
                >
                  
                  <Image 
                    publicId={processImageId}
                    onClick={this.openLightbox}
                    width="500"
                    height="350"
                    crop="pad"
                    background="black"
                  />
                  <div className="process-ctrl">
                    <button className="prev-btn" onClick={this.previousProcessImage}>&lt;</button>
                    <button className="zoom-btn" onClick={this.processLightbox}>Zoom</button>
                    <button className="next-btn" onClick={this.nextProcessImage}>&gt;</button>
                  </div>
                </div>
                
              )}
            </div>
            <div className="image-nav-btn next-btn" onClick={moveNext}>
              {/* <FontAwesomeIcon icon="chevron-circle-right" size="lg" /> */}
              <ArrowButton direction="right" />
            </div>
            {/* Info Section */}
            <div className="spacer" />
            {info.hasContext && (
              <div className="image-info">
                <div className="title">{info.title || 'Untitled'}</div>
                <div className="descript">{info.description}</div>
                {info.moreInfo && (
                  <div className="more-info">
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
    
                      {/* Buttons */}
    
                    {currentImage.public_id.startsWith('art/') && (
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
                    )}
                    
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
                )}
                {!info.moreInfo && (
                  <div className="todo">Collapse this block</div>
                )}
              </div>
            )}
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
   * the function to open image in Zoom
   */
  selectLightbox: PropTypes.func.isRequired,
  /**
   * the image array, for Zoom
   */
  imageList: PropTypes.array
}

ImageDisplay.defaultProps = {
  currentImage: null,
  selectLightbox: selectLightboxUtil,
  moveNext: moveNextUtil,
  movePrevious: movePreviousUtil
}

export default ImageDisplay;
