import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import Container from 'react-bootstrap/Container';
import { defaultImg, getContextProperty } from '../../utils/cloudinaryApi';
import classNames from 'classnames';
// import { withContentRect } from 'react-measure';


import './gallery.scss';

const ThumbGallery = props => {
  const { galleryImages, selectThumbnail, imageIndex } = props;

  return (
    <Container className="gallery">
      {galleryImages.map((thumb, index) => (
        <Image key={thumb.public_id}
          className={classNames('responsive', 'thumbnail', { selected: index === imageIndex })}
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
   * maximum height, in vh
   * (used to be in CSS)
   */
  maxHeight: PropTypes.number
}

ThumbGallery.defaultProps = {
  galleryImages: [],
  thumbSize: 100,
  imageIndex: 0
}

// export default withStacking(ThumbGallery);
export default ThumbGallery;
