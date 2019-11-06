import React from 'react';
import { Image } from 'cloudinary-react';
import Spinner from 'react-bootstrap/Spinner';
import { fetchGallery } from '../utils/imageApi';

class SimpleGallery extends React.Component {
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
    fetchGallery(tagName)
      .then(res => {
        this.setState({
          images: res.data.resources.slice(0, size - 1),
          isLoaded: true
        })
      });
  }

  render () {
    const { images, isLoaded } = this.state;
    const { imageWidth, handleImageClick } = this.props;
    if (!isLoaded) {
      return <Spinner animation="grow" variant="dark" />
    } else {
      return (
        <div className="basic-gallery">
          {images.map(image => (
            <Image 
              key={image.publid_id} 
              className="responsive" 
              height={imageWidth}
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

export default SimpleGallery;
