import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Image, Transformation } from 'cloudinary-react';
import { defaultImg }from 'Api/cloudinaryApi';
import classNames from 'classnames';

/**
 * Stateless button for displaying Gallery
 *  can be collapsed to show only title
 * @param {Object} props 
 */
const GalleryButton = props => {
  const { navGallery, isSelected, isCollapsed, imageSize } = props;
  const { selectHandler } = props;
  
  return (
    <Card className={classNames({'selected-nav': isSelected})}
      onClick={() => selectHandler(navGallery)}
    >
      <Card.Header>{navGallery.name}</Card.Header>
      {!isCollapsed && (
        <Card.Body className={classNames('album-btn', 'responsive', 'thumbnail')}>
          <Image publicId={navGallery.thumbnail}>
            <Transformation height={imageSize} width={imageSize} crop="fill" />
            <Transformation defaultImag={defaultImg} />
          </Image>
        </Card.Body>
      )}
    </Card>
  )
}

GalleryButton.propTypes = {
  navGallery: PropTypes.object.isRequired,
  selectHandler: PropTypes.func.isRequired,
  imageSize: PropTypes.number,
  isSelected: PropTypes.bool,
  isMobileView: PropTypes.bool,
  isCollapsed: PropTypes.bool,
};

GalleryButton.defaultProps = {
  navGallery: {
    name: 'Missing',
    tag: '',
    thumbnail: {defaultImg}
  },
  imageSize: 80,
  isSelected: false,
  isCollapsed: false,
  isMobileView: false
};

export default GalleryButton;