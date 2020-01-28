import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import Spinner from 'react-bootstrap/Spinner';
import Lightbox from 'react-image-lightbox';
import { fetchGallery, cleanImageSrc } from '../utils/imageApi';

import 'react-image-lightbox/style.css';

class SimpleGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      isLoaded: false,
      lighboxOpen: false,
      selectedImage: null
    }
  }

  componentDidMount () {
    const { tagName, gallerySize } = this.props;
    this.updateImages(tagName, gallerySize);
  }

  updateImages = (tagName, size) => {
    fetchGallery(tagName)
      .then(res => {
        let arr = res.data.resources.slice(0, size);
        this.shuffleImages(arr);
        this.setState({
          images: arr,
          isLoaded: true
        })
      });
  }

  shuffleImages = array => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  closeLightbox = () => {
    this.setState({
      lighboxOpen: false
    })
  }

  render () {
    const { images, isLoaded, lighboxOpen, selectedImage } = this.state;
    const { imageHeight } = this.props;
    if (lighboxOpen) {
      return (
        <Lightbox 
          mainSrc={cleanImageSrc(selectedImage.public_id)}
          onCloseRequest={this.closeLightbox}
          discourageDownloads
        />
      );
    } else if (!isLoaded) {
      return <Spinner animation="grow" variant="dark" />
    } else {
      return (
        <div className="basic-gallery">
          {images.map(image => (
            <Image 
              key={image.publid_id} 
              className="responsive" 
              height={imageHeight}
              crop="fit" 
              cloudName="cantimaginewhy" 
              publicId={image.public_id}
              onClick={() => this.setState({
                selectedImage: image,
                lighboxOpen: true
              })}
            />
          ))}
        </div>
      );
    }
  }
}

SimpleGallery.propTypes = {
  tagName: PropTypes.string.isRequired,
  gallerySize: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
}

export default SimpleGallery;
