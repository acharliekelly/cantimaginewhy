import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Image } from 'cloudinary-react';
import { fetchGallery, getContextProperty }from '../../utils/cloudinaryApi';
import { shuffleArray } from '../../utils/miscUtils';
import { withLightbox } from '../higherOrder/withLightbox';

const SliceGallery = props => {
  const [ images, setImages ] = useState([]);
  const { tagName, gallerySize, imageHeight } = props;

  useEffect(() => {
    fetchGallery(tagName).then(resources => {
      shuffleArray(resources);
      setImages(resources.slice(0, gallerySize))
    })
  }, [tagName, gallerySize]);

  return (
    <Container fluid="lg">
      {images.map((image, index) => (
          <Image 
            key={index} 
            title={getContextProperty(image, 'caption', 'Untitled')}
            responsive 
            height={imageHeight}
            crop="fit" 
            cloudName="cantimaginewhy" 
            publicId={image.public_id}
            style={{ margin: '0.5em', cursor: 'pointer' }}
            onClick={() => props.setLightboxArray(images, index)}
          />
      ))}
    </Container>
  );
}

SliceGallery.propTypes = {
  tagName: PropTypes.string.isRequired,
  gallerySize: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  setLightboxArray: PropTypes.func
};

SliceGallery.defaultProps = {
  tagName: 'favorite',
  gallerySize: 4,
  imageHeight: 200
};

export default withLightbox(SliceGallery);
