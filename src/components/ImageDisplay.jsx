import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { watermarkedImageSrc } from '../utils/imageApi';

class ImageDisplay extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentIndex: 0
    }
  }

  componentDidMount () {
    const { pictures, selectedImage } = this.props;
    this.setState({
      currentIndex: pictures.indexOf(selectedImage)
    });
  }

  getCaption = index => {
    const picture = this.props.pictures[index];
    let caption;
    try {
      caption = picture.context.custom.caption;
    } catch (err) {
      caption = 'Untitled';
    }
    return caption;
  }

  getImageSource = index => {
    const pic = this.props.pictures[index];
    return watermarkedImageSrc(pic.public_id);
  }

  moveNext = () => {
    const size = this.props.pictures.length;
    const idx = this.state.currentIndex;
    this.setState({
      currentIndex: (idx + 1) % size
    });
  }

  movePrevious = () => {
    const size = this.props.pictures.length;
    const idx = this.state.currentIndex;
    this.setState({
      currentIndex: (idx + size - 1) % size
    });
  }

  showCarousel = () => {
    const { currentIndex } = this.state;
    const size = this.props.pictures.length;
    return (
      <Lightbox 
        mainSrc={this.getImageSource(currentIndex)}
        nextSrc={this.getImageSource((currentIndex + 1) % size)}
        prevSrc={this.getImageSource((currentIndex + size - 1) % size)}
        onCloseRequest={this.props.closeImageHandler}
        onMoveNexRequest={this.moveNext}
        onMovePrevRequest={this.movePrevious}
        imageTitle={this.getCaption(currentIndex)}
      />
    );
  }

  showSinglePicture = () => {
    const picture = this.props.pictures[0];

    return (
      <Lightbox
        mainSrc={watermarkedImageSrc(picture.public_id)}
        onCloseRequest={this.props.closeImageHandler}
        discourageDownloads={true}
        imageTitle={this.getCaption(picture)}
      />
    );
  }

  showNoPictures = () => (
    <div className="no-pictures"></div>
  );


  render () {
    const { pictures, lightboxOpen } = this.props;
    if (lightboxOpen && pictures.length > 0) {
      return this.showCarousel();
    } else {
      return this.showNoPictures();
    }
  }

}

ImageDisplay.propTypes = {
  pictures: PropTypes.array.isRequired,
  closeImageHandler: PropTypes.func.isRequired,
  lightboxOpen: PropTypes.bool.isRequired,
  selectedImage: PropTypes.object,
  toolbarButtons: PropTypes.array
};

export default ImageDisplay;
