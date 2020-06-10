import React from 'react';
// import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import Container from 'react-bootstrap/Container';
import { defaultImg, getContextProperty } from '../../utils/cloudinaryApi';
import classNames from 'classnames';
import { GalleryModel } from '../../utils/imageApi';

const BoundGallery = props => {
  const { galleryImages, selectThumbnail, imageIndex } = props;
  const iGallery = new GalleryModel(galleryImages, imageIndex);
  iGallery.bindComponent(this);
  iGallery.bindMethod(selectThumbnail);

  const clickImage = index => {
    iGallery.setIndex(index);
    iGallery.updateComponents()
  }

  const imgClass = idx => {
    return classNames('responsive', 'thumbnail', {'selected': idx === imageIndex})
  }

  return (
    <Container className="gallery">
      {galleryImages.map((thumb, index) => (
        <Image key={index}
          className={imgClass(index)}
          title={getContextProperty(thumb, 'caption')}
          publicId={thumb.public_id}
          onClick={() => clickImage(index)} >
          <Transformation height={props.thumbSize} width={props.thumbSize} crop="fill" />
          <Transformation defaultImage={defaultImg} />
        </Image>
      ))}
    </Container>
  )
}


export default BoundGallery;