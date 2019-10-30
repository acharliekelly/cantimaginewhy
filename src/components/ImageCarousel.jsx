// uses Bootstrap carousel
import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import { fetchGallery } from '../utils/imageApi';



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
        <Carousel >
          {pictures.map(pic => (
            <Carousel.Item>
              <Image cloudName="cantimaginewhy" publicId={pic.public_id} crop="fit" height="200" />
              <Carousel.Caption>
                <h3>{pic.context.custom.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }
    
  }

}

export default ImageCarousel;
