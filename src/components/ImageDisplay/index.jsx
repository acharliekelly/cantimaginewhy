import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ArrowButton } from '../Buttons';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { selectLightboxUtil, moveNextUtil, movePreviousUtil } from '../../utils/imageUtils';
import  { faaLookup } from '../../utils/fineArtApi';
import { onsitePhotos } from '../../utils/onsiteUtils';
import { nextImageId, previousImageId } from '../../utils/processUtils';
import { loadImageProps } from '../../utils/imageContext';
import { StatefulOrderForm } from '../OrderForm/';
import ProgressGallery from '../ProgressGallery/';

import './display.scss';

// TODO: break this up into smaller components!

class ImageDisplay extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      orderFormOpen: false,
      processImageId: null,
      currentIndex: 0
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
    ev.preventDefault();
    const { orderFormOpen } = this.state;
    this.setState({
      orderFormOpen: !orderFormOpen
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if ((prevProps.currentImage !== this.props.currentImage) 
        || (prevProps.index !== this.props.index)) {
          this.setState({
            orderFormOpen: false,
            processImageId: null
          })
    }
  }

  handleNext = ev => {
    ev.preventDefault();
    const { moveNext } = this.props;
    // console.log('Next clicked.')
    moveNext(ev);
  }

  handlePrevious = ev => {
    ev.preventDefault();
    const { movePrevious } = this.props;
    // console.log('Prev clicked.')
    movePrevious(ev);
  }

  render () {
    const { currentImage } = this.props;
    const { orderFormOpen, processImageId } = this.state;
    if (currentImage) {
      const info = loadImageProps(currentImage);
      return (
        <CloudinaryContext cloudName="cantimaginewhy">
          <div className="image-box">
            <div className="image-view">
              <span className="image-nav-btn prev-btn" onClick={this.handlePrevious}>
                <FontAwesomeIcon icon="chevron-left" size="7x" />
              </span>
              {/* Main image */}
              <Image
                  className="display-image"
                  publicId={info.id}
                  onClick={this.openLightbox}
                  height="400"
                  width="600"
                  crop="lpad"
                  background="white"
                />
                {/* Process image */}
                {processImageId && (
                  <div className="process-image" onClick={this.closeProcess} >
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
              <span className="image-nav-btn next-btn" onClick={this.handleNext}>
                <FontAwesomeIcon icon="chevron-right" size="7x" />
              </span>
            </div>
            
          </div>
        {info.hasContext && (
          <Container className="image-info">
            <Row>
              <Col className="title">{info.title}</Col>
            </Row>
            <Row>
              <Col className="descript">{info.description}</Col>
            </Row>
          {info.location && (
            <Row className="info">
              <Col className="label">Location: </Col>
              <Col className="data">{info.location}</Col>
            </Row>
          )}
          {info.year && (
          <Row className="info">
            <Col className="label">Year: </Col>
            <Col className="data">{info.year}</Col>
          </Row>
          )}
          {info.materialInfo && (
          <Row className="info">
            <Col className="label">Material: </Col>
            <Col className="data">{info.medium}, {info.size}</Col>
          </Row>
          )}
          </Container>
        )}
        {info.showOptions && (
          <Container className="image-info">
            <Row className="info">
              <Col className="label">Original Picture: </Col>
              {info.forSale && (
              <Col className="data">$ {info.price}</Col>
              )}
              {/* {info.forSale && (
              <Col className="btn">
                <Button className="feature" onClick={this.showOrderForm}>Buy</Button>
              </Col>
              )} */}
              {!info.forSale && (
              <Col className="nfs">Not Available</Col>
              )}
            </Row>
            <Row className="info">
              <Col className="label">Prints &amp; Whatnot: </Col>
              {info.forPrint && (
                <Col className="data">Available</Col>
              )}
              {info.forPrint && (
                <Col className="btn">
                  <a 
                    className="feature btn btn-primary" 
                    rel="noopener noreferrer" 
                    target="_blank" 
                    href={faaLookup(info.id)}>Buy</a>
                </Col>
              )}
              {!info.forPrint && (
                  <Col className="nfs">Not Available</Col>
              )}
            </Row>
            { info.processImgs && (
            <Row>
              <Col className="options">
                <ProgressGallery 
                  refKey={info.refKey} 
                  imageHeight={60}
                  selectImage={this.setProcessImage} 
                />
              </Col>
            </Row>
            )}
            {(orderFormOpen && info.forSale) && (
            <Row>
              <Col className="form">
                <a className="close-btn" href="/" onClick={this.hideOrderForm}>X</a>
                <StatefulOrderForm 
                  className="inner-form"
                  imageId={info.id}
                  price={info.price}
                  closeForm={this.hideOrderForm}
                />
              </Col>
            </Row>
            )}
          </Container>
        )}
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
