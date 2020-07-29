import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';

import MobileNav from '../Navs/MobileNav';
import Explan from '../Explan/';
import ThumbGallery from '../../containers/MainGallery';
import ProgressView from '../../containers/ProgressView';
import GeoView from '../../containers/GeoView';

// TODO: move these to Thunks
import { getExplanation } from '../../utils/tagUtils';
import { isSeriesExist } from '../../utils/onsiteUtils';


import { withStacking } from '../higherOrder/withStacking';
// import { Breakpoint } from 'react-socks';

import './stack.scss';

/**
 * Makes accordion of stacked components
 */
const Stacker = props => {
  // current album has About section
  const [ albumAbout, setAlbumAbout ] = useState(null);
  // current image has Progress section
  const [ hasProgress, setHasProgress ] = useState(false);
 
  
  const { tagObject, referenceKey, isFullWidth, updateSelectNav, galleryImages } = props;

  // on change album
  useEffect(() => {
    if (tagObject) {
      setAlbumAbout(getExplanation(tagObject, false));
    } else {
      setAlbumAbout(null);
    }
  }, [tagObject]);

  // on change image
  useEffect(() => {
    if (referenceKey) {
      setHasProgress(isSeriesExist(referenceKey))
    } else {
      setHasProgress(false);
    }
  }, [referenceKey]);

  const StackedGallery = withStacking(ThumbGallery);

  const activeKey = isFullWidth ? 'albums' : 'gallery';


  if (isFullWidth || tagObject) { 
    return (
      <div className="stacker">
        <StackBoundary>
          <Accordion defaultActiveKey={activeKey}>

          {updateSelectNav && (   // only set on small screens; otherwise nav not in stack
            <MobileNav  
              eventKeyName="albums"
              variant="primary"
              cardTitle="Albums"
              {...props}
            />
          )}

          {albumAbout && (
            <Explan  
              fullText={albumAbout} 
              eventKeyName="explan"
              variant="dark"
              cardTitle="About Album" 
              enabled={albumAbout && 1}
              {...props} />
          )}
          {galleryImages && (
            <StackedGallery 
              eventKeyName="gallery" 
              variant="primary"
              cardTitle="Gallery"
              enabled={galleryImages.length > 0}
              {...props} />
          )}
          

          {hasProgress && (
            <ProgressView 
              eventKeyName="progress"
              cardTitle="Artistic Process"
              variant="info"
              enabled={hasProgress}
            />
          )}

          {props.geoTag && (
            <GeoView 
              eventKeyName="geo"
              cardTitle="Location"
              variant="secondary"
              enabled={props.geoTag}
              {...props} />
          )}
          
          </Accordion>
        </StackBoundary>
      </div>
    )
  } else {
    return <div/>
  }
}

Stacker.propTypes = {
  /**
   * the image array (results of fetchGallery)
   */
  galleryImages: PropTypes.array,
  /**
   * what to do when image is selected
   */
  selectThumbnail: PropTypes.func,
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
   * maximum height (vh) for any item
   */
  maxHeight: PropTypes.number,
  /**
   * for ProgressView
   */
  referenceKey: PropTypes.string,
  /**
   * for GeoView
   */
  geoTag: PropTypes.string,
  /**
   * if true, stacker is entire width of viewport (ie mobile)
   */
  isFullWidth: PropTypes.bool,
  /**
   * move fwd & bkwd (for ImageToolbar)
   */
  imageMovement: PropTypes.object,
  /**
   * function to select new album
   */
  updateSelectNav: PropTypes.func
};

Stacker.defaultProps = {
  galleryImages: [],
  thumbSize: 100,
  imageIndex: 0,
  maxHeight: 70,
  referenceKey: null,
  geoTag: null,
  isFullWidth: false,
  imageMovement: null
}

export default Stacker;

/**
 * Error boundary
 */
export class StackBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch (error, info) {
    this.setState({
      hasError: true
    })
    console.log('Something broke in Stacker: ', error, info)
  }

  render () {
    if (this.props.hasError) {
      return <h1 className="error">Something is broken!</h1>
    }
    return this.props.children;
  }
}