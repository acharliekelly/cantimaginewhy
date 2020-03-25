import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { selectLightboxUtil, moveNextUtil, movePreviousUtil } from '../../utils/imageUtils';
import  { faaLookup } from '../../utils/fineArtApi';
import { onsitePhotos } from '../../utils/onsiteUtils';
import { nextImageId, previousImageId } from '../../utils/processUtils';
import { loadImageProps } from '../../utils/imageContext';
import ProgressGallery from '../ProgressGallery/';
import ImageToolbar from '../ImageToolbar/';

import './display.scss';

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
   * Open process image in lightbox
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
    const { processImageId } = this.state;
    if (currentImage) {
      const info = loadImageProps(currentImage);
      return (
        <CloudinaryContext cloudName="cantimaginewhy">
          <Container className="image-box">
            <Container className="image-view">
              {/* Main image */}
              <Image
                  className="display-image"
                  publicId={info.id}
                  height="400"
                  width="600"
                  crop="lpad"
                  background="white"
                />
                {/* Process image */}
                {processImageId && (
                  <Container className="process-overlay" onClick={this.closeProcess} >
                    <Image 
                      publicId={processImageId}
                      height="300"
                    />
                    <ImageToolbar
                      toolbarClass="process-toolbar"
                      variant="light"
                      imgSize="1x"
                      prevImageFn={this.previousProcessImage}
                      nextImageFn={this.nextProcessImage}
                      zoomImageFn={this.processLightbox}
                    />
                  </Container>
                )}
            </Container>

            <ImageToolbar 
              toolbarClass="display-toolbar"
              variant="dark"
              imgSize="3x"
              prevImageFn={this.handlePrevious}
              nextImageFn={this.handleNext}
              zoomImageFn={this.openLightbox}
            />

          </Container>
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
