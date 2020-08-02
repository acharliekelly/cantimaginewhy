import React from 'react';
import PropTypes from 'prop-types';
import CardDeck from 'react-bootstrap/CardDeck';

import GalleryButton from '../GalleryButton';

/**
 * Stateless array of gallery buttons
 *  - able to collapse all buttons at once 
 *  - can force buttons to stay in horizontal line,
 *    or wrap to fill area
 * @param {Object} props 
 */
const GalleryGroup = props => {
  const { galleryList, isCollapsed, isInline, buttonMargins } = props;
  const { selectedTag, selectTagHandler } = props;
  
  const btnStyle = {
    display: isInline ? 'inline-block' : 'block',
    overflowX: isInline ? 'scroll' : 'hidden',
    margin: buttonMargins
  }
  return (
    <CardDeck>
      {galleryList.map(gallery => (
        <GalleryButton
          key={gallery.tag}
          navGallery={gallery}
          selectHandler={selectTagHandler}
          style={btnStyle}
          isSelected={gallery.tag === selectedTag}
          isCollapsed={isCollapsed}
        />
      ))}
    </CardDeck>
  );
};

GalleryGroup.propTypes = {
  // array of navGalleries
  galleryList: PropTypes.array.isRequired,
  // what to do when gallery is selected (creates Action)
  selectTagHandler: PropTypes.func.isRequired,
  // tag string of selected gallery
  selectedTag: PropTypes.string,
  isCollapsed: PropTypes.bool,
  isInline: PropTypes.bool,
  buttonMargins: PropTypes.string,
};

GalleryGroup.defaultProps = {
  isCollapsed: false,
  isInline: true,
  buttonMargins: '0.2em 1em',
};

export default GalleryGroup;