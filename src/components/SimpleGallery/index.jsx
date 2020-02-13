import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import Lightbox from 'react-image-lightbox';
import { fetchGallery, lightboxImageSrc } from '../../utils/imageApi';

import 'react-image-lightbox/style.css';

class SimpleGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      lighboxOpen: false,
      selectedImage: null
    }
  }

  componentDidMount () {
    const { tagName, gallerySize } = this.props;
    this.updateImages(tagName, gallerySize);
  }

  // fetch images with tagName
  updateImages = (tagName, size) => {
    fetchGallery(tagName)
      .then(res => {
        let arr = res.data.resources;
        this.shuffleImages(arr);
        this.setState({
          images: arr.slice(0, size)
        })
      });
  }

  // randomize current image set
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
    const { images, lighboxOpen, selectedImage } = this.state;
    const { imageHeight } = this.props;
    return (
      <div className="gallery-wrapper">
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
          { lighboxOpen && (
              <Lightbox 
              mainSrc={lightboxImageSrc(selectedImage.public_id)}
              onCloseRequest={this.closeLightbox}
              discourageDownloads
            />
          )}
        </div>
    );
  }
}

SimpleGallery.propTypes = {
  tagName: PropTypes.string.isRequired,
  gallerySize: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
}

export default SimpleGallery;
