import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import Spinner from 'react-bootstrap/Spinner';
import { fetchGallery } from '../utils/imageApi';

class RandomGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    const { tagName, gallerySize } = this.props;
    this.updateImages(tagName, gallerySize);
  }

  updateImages = (tagName, size) => {
    const tmpArray = [];
    fetchGallery(tagName)
      .then(res => {
        const maxLength = res.data.resources.length;
        console.log('array length: ' + maxLength);
        while (tmpArray.length < size) {
          const idx = Math.floor(Math.random * maxLength);
          console.log('adding image: ' + res.data.resources[idx]);
          tmpArray.push(res.data.resources[idx]);
        }
        this.setState({
          images: tmpArray,
          isLoaded: true
        })
      });
  }

  render () {
    const { images, isLoaded } = this.state;
    const { imageHeight, handleImageClick } = this.props;
    if (!isLoaded) {
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
              onClick={handleImageClick}
            />
          ))}
        </div>
      );
    }
  }
}

RandomGallery.propTypes = {
  tagName: PropTypes.string.isRequired,
  gallerySize: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  handleImageClick: PropTypes.func.isRequired
}

export default RandomGallery;
