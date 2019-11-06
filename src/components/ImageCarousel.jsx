// uses Bootstrap carousel
import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import Spinner from 'react-bootstrap/Spinner';
import AliceCarousel from 'react-alice-carousel';
import { fetchGallery } from '../utils/imageApi';

import "react-alice-carousel/lib/alice-carousel.css";

class ImageCarousel extends Component {

  constructor () {
    super();
    this.state = {
      isLoaded: false,
      pictures: []
    }
  }

  componentDidMount () {
    const { tagName } = this.props;
    this.updateImages(tagName);
  }

  updateImages = tagName => {
    fetchGallery(tagName)
      .then(res => {
        this.setState({
          pictures: res.data.resources,
          isLoaded: true
        })
      });
  }

  handleClickImage = img => {
    // this.props.selectImage(img);
  }

  render () {
    const { pictures, isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <Spinner variant="dark" animation="grow" />
      )
    } else {
      return (
        <AliceCarousel autoPlay duration={2000} buttonsDisabled >
          {pictures.map(pic => (
            <Image key={pic.public_id} cloudName="cantimaginewhy" publicId={pic.public_id} crop="fit" height="300" />
          ))}
        </AliceCarousel>
      );
    }
    
  }

}

export default ImageCarousel;
