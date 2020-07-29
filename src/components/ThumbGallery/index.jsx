import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import Container from 'react-bootstrap/Container';
import classNames from 'classnames';

import { defaultImg, getContextProperty } from 'Api/cloudinaryApi';

import './gallery.scss';

const ThumbGallery = props => {
  const { galleryImages, selectThumbnail, currentIndex } = props;

  const imgClass = idx => {
    return classNames('responsive', 'thumbnail', {'selected': idx === currentIndex})
  }

  return (
    <Container className="gallery">
      {galleryImages.map((thumb, index) => (
        <Image key={index}
          className={imgClass(index)}
          title={getContextProperty(thumb, 'caption')}
          publicId={thumb.public_id}
          onClick={() => selectThumbnail(index)} >
          <Transformation height={props.thumbSize} width={props.thumbSize} crop="fill" />
          <Transformation defaultImage={defaultImg} />
        </Image>
      ))}
    </Container>
  )
}


// export default withStacking(ThumbGallery);
export default ThumbGallery;
