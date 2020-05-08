import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import withSizes from 'react-sizes';
import { zoomImageSrc, getImageSrc, getContextProperty }from '../../utils/cloudinaryApi';

import 'react-image-lightbox/style.css';

/**
 * Lightbox wrapper component
 */
class ImageZoom extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      currentIndex: 0
    };
  }

  componentDidMount () {
    this.updateProps();
  }

  componentWillUnmount () {
    this.setState({
      images: [],
      currentIndex: 0
    })
  }

  updateProps = () => {
    const { imageList, selectedIndex, selectedImageId } = this.props;
    
    if (imageList) {
      this.updateImageList(imageList, selectedIndex);
    } else if (selectedImageId) {
      this.updateSelectedImage(selectedImageId);
    }
  }


  updateSelectedImage = imageId => {
    const src = getImageSrc(imageId);
    const list = [];
    list.push(src);
    this.setState({
      images: list,
      currentIndex: 0
    })
  }

  updateImageList = (list, index = 0) => {
    // const arr = this.convertJsonList(list);
    this.setState({
      images: list,
      currentIndex: index
    })
  }

  // Lightbox takes array of src strings, but incoming list will most likely be JSON
  convertJsonList = inputList => {
    let srcList = [];
    if (typeof inputList[0] === 'string') {
      // determine if CPI or src
      if (inputList[0].endsWith('.jpg')) {
        // already in src format
        srcList = inputList;
      } else {
        // CPI format, need to convert
        srcList = inputList.map(id => getImageSrc(id));
      }
    } else {
      srcList = inputList.map(obj => zoomImageSrc(obj));
    }
    return srcList;
  }

  moveNext = () => {
    const { images, currentIndex } = this.state;
    if (images.length > 1) {
      const next = (currentIndex + 1) % images.length;
      this.setState({
        currentIndex: next
      })
    }
  }

  movePrevious = () => {
    const { images, currentIndex } = this.state;
    if (images.length > 1) {
      const prev = (currentIndex + images.length - 1) % images.length;
      this.setState({
        currentIndex: prev
      })
    }
  }


  render () {
    // block render if screen is too small
    if (!this.props.allowLightbox) return '';

    const { images, currentIndex } = this.state;
    const title = getContextProperty(images[currentIndex], 'caption', '');
    const caption = getContextProperty(images[currentIndex], 'alt', '');
    if (images.length === 1) { // single image, no prev or next
      return (
        <Lightbox 
          onCloseRequest={this.props.closeLightbox} 
          imageCrossOrigin="anonymous"
          discourageDownloads
          clickOutsideToClose
          mainSrc={zoomImageSrc(images[0])}
          imageTitle={title}
          imageCaption={caption}
          imageLoadErrorMessage="..."
        />
      );
    } else { // multiple images
      return (
        <Lightbox 
          onCloseRequest={this.props.closeLightbox} 
          imageCrossOrigin="anonymous"
          discourageDownloads
          clickOutsideToClose
          mainSrc={zoomImageSrc(images[currentIndex])}
          nextSrc={zoomImageSrc(images[(currentIndex + 1) % images.length])}
          prevSrc={zoomImageSrc(images[(currentIndex + images.length - 1) % images.length])}
          onMoveNextRequest={this.moveNext}
          onMovePrevRequest={this.movePrevious}
          imageLoadErrorMessage="..."
          imageTitle={title}
          imageCaption={caption}
        />
      );
    }
  }
}

ImageZoom.propTypes = {
  /**
   * array of Cloudinary image objects
   */
  imageList: PropTypes.array,
  /**
   * currently selected index
   */
  selectedIndex: PropTypes.number,
  /**
   * the CPI of a single image, instead of array
   */
  selectedImageId: PropTypes.string,
  closeLightbox: PropTypes.func
}

const mapSizesToProps = ({ width }) => ({
  allowLightbox: width > 480
});

export default withSizes(mapSizesToProps)(ImageZoom);
