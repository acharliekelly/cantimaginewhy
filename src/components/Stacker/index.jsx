import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Explan from '../Explan';
import ThumbGallery from '../ThumbGallery';
import ProgressView from '../ProgressView';
import GeoView from '../GeoView';
import { getExplanation } from '../../utils/tagUtils';
import { isSeriesExist } from '../../utils/onsiteUtils';
import { withStacking } from '../HigherOrder/withStacking';



/**
 * Makes accordion of stacked components
 */
const Stacker = props => {
  const [ albumAbout, setAlbumAbout ] = useState(null);
  const [ hasProgress, setHasProgress ] = useState(false);

  const { tagObject, refKey } = props;

  const StackExplan = withStacking(Explan);
  const StackGallery = withStacking(ThumbGallery);
  const StackProgress = withStacking(ProgressView);
  const StackGeo = withStacking(GeoView);
  
  useEffect(() => {
    if (tagObject) {
      setAlbumAbout(getExplanation(tagObject, false));
    } else {
      setAlbumAbout(null);
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
        <Accordion defaultActiveKey="gallery">
          {albumAbout && (
            <StackExplan  
              fullText={albumAbout} 
              eventKeyName="explan"
              variant="dark"
              cardTitle="About Album" 
              {...props} />
          )}
          
          <StackGallery 
            eventKeyName="gallery" 
            variant="primary"
            cardTitle="Gallery"
            {...props} />

          {hasProgress && (
            <StackProgress 
              eventKeyName="progress"
              cardTitle="Artistic Process"
              variant="success"
              {...props} />
          )}

          {props.geoTag && (
            <StackGeo 
              eventKeyName="geo"
              cardTitle="Location"
              variant="secondary"
              {...props} />
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
  tagObject: PropTypes.object,
  /**
   * 
   */
  maxHeight: PropTypes.number,
  /**
   * for ProgressView
   */
  refKey: PropTypes.string,
  /**
   * for GeoView
   */
  geoTag: PropTypes.string
};

Stacker.defaultProps = {
  galleryImages: [],
  thumbSize: 100,
  imageIndex: 0,
  maxHeight: 60,
  refKey: null,
  geoTag: null
}

export default Stacker;
