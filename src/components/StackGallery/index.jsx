import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ThumbGallery from '../ThumbGallery';

import './sgal.scss';

const StackGallery = props => {

  const { stackPosition } = props;

  return (
    <Card className="gallery-card" border={props.variant} text={props.variant} >
      <Accordion.Toggle as={Card.Header} eventKey={stackPosition}>
        <strong>Gallery</strong>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={stackPosition}>
        <Card.Body>
          <ThumbGallery 
            selectThumbnail={props.selectThumbnail} 
            galleryImages={props.galleryImages}
            imageIndex={props.imageIndex}
            thumbSize={props.thumbSize}
            maxHeight={props.maximumHeight}
            />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

StackGallery.propTypes = {
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
  tagObject: PropTypes.object,
  /** 
   * where in the card stack this is
  */
  stackPosition: PropTypes.number,
  maximumHeight: PropTypes.number,
  variant: PropTypes.string
}

StackGallery.defaultProps = {
  galleryImages: [],
  thumbSize: 100,
  imageIndex: 0,
  stackPosition: 0,
  maximumHeight: 60,
  variant: 'primary'
}

export default StackGallery;
