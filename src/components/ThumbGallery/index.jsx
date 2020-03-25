import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Container from 'react-bootstrap/Container';
import { defaultImg, getContextProperty } from '../../utils/imageApi';

import './gallery.scss';

const ThumbGallery = props => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { galleryImages, selectThumbnail, thumbSize } = props;

  const clickImage = index => {
    setCurrentIndex(index);
    selectThumbnail(index);
  }

  // if (props.imageIndex) {
  //   setCurrentIndex(props.imageIndex);
  // }

  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <Container fluid className="gallery">
        {galleryImages.map((thumb, index) => (
          <div key={index}>
            <Image 
              className={`responsive thumbnail ${index === currentIndex && 'selected'}`}
              title={getContextProperty(thumb, 'caption')}
              publicId={thumb.public_id}
              onClick={() => clickImage(index)}>
              <Transformation height={thumbSize} width={thumbSize} crop="fill" />
              <Transformation defaultImage={defaultImg} />
            </Image>
          </div>
        ))}
      </Container>
    </CloudinaryContext>
  )
}

ThumbGallery.propTypes = {
  /**
   * the image array (results of fetchGallery)
   */
  galleryImages: PropTypes.array.isRequired,
  /**
   * what to do when image is selected
   */
  selectThumbnail: PropTypes.func.isRequired,
  /**
   * thumbnail size
   */
  thumbSize: PropTypes.number,
  /**
   * index
   */
  imageIndex: PropTypes.number
}

ThumbGallery.defaultProps = {
  galleryImages: [],
  thumbSize: 100
}

export default ThumbGallery;
