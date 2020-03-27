import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Container from 'react-bootstrap/Container';
import { defaultImg, getContextProperty } from '../../utils/imageApi';

import './gallery.scss';

const ThumbGallery = props => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { galleryImages, selectThumbnail, thumbSize, imageIndex, heading } = props;

  const clickImage = index => {
    setCurrentIndex(index);
    selectThumbnail(index);
  }

  useEffect(() => {
    setCurrentIndex(imageIndex)
  }, [imageIndex]);
    

  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <div className="gallery-wrapper">
      {heading && (
        <header className="gallery-title">
          <div className="title">{heading.name}</div>
          <div className="description">{heading.description}</div>
        </header>
      )}
        <Container className="gallery">
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
      </div>
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
  imageIndex: PropTypes.number,
  /**
   * Gallery heading (name & description)
   */
  heading: PropTypes.object
}

ThumbGallery.defaultProps = {
  galleryImages: [],
  thumbSize: 100,
  imageIndex: 0
}

export default ThumbGallery;
