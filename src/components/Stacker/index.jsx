import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Explan from '../Explan';
import StackGallery from '../StackGallery';
import ProgressView from '../ProgressView';
import { hasExplan } from '../../utils/tagUtils';
import { isSeriesExist } from '../../utils/onsiteUtils';



/**
 * Makes accordion of stacked components
 */
const Stacker = props => {
  const [ hasExp, setHasExp ] = useState(false);
  const [ hasProgress, setHasProgress ] = useState(false);

  const { tagObject, refKey } = props;
  
  useEffect(() => {
    if (tagObject && tagObject.tag) {
      setHasExp(hasExplan(tagObject.tag))
    } else {
      setHasExp(false);
    }
  }, [tagObject]);

  useEffect(() => {
    if (refKey) {
      setHasProgress(isSeriesExist(refKey))
    } else {
      setHasProgress(false);
    }
  }, [refKey]);

  if (tagObject) {
    return (
      <div className="stacker">
        <Accordion defaultActiveKey={0}>
          {hasExp && (
            <Explan tagObject={tagObject} stackPosition={0} />
          )}
          
          <StackGallery 
            tagObject={tagObject} 
            stackPosition={hasExp ? 1 : 0} 
            galleryImages={props.galleryImages}
            selectThumbnail={props.selectThumbnail}
            thumbSize={props.thumbSize}
            imageIndex={props.imageIndex} />

          {hasProgress && (
            <ProgressView stackPosition={hasExp ? 2 : 1}
              selectLightbox={props.selectLightbox}
              refKey={props.refKey} />
          )}
          
        </Accordion>
      </div>
    )
  } else {
    return <div />
  }
  
}

Stacker.propTypes = {
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
  tagObject: PropTypes.object.isRequired,
  /**
   * 
   */
  maximumHeight: PropTypes.number,
  /**
   * for ProgressView
   */
  selectLightbox: PropTypes.func.isRequired,
  refKey: PropTypes.string
};

Stacker.defaultProps = {
  galleryImages: [],
  thumbSize: 100,
  imageIndex: 0,
  maximumHeight: 60,
  refKey: null,
}

export default Stacker;
