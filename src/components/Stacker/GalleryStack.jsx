import React from 'react';

import Accordion from 'react-bootstrap/Accordion';

import Explan from '../AlbumInfo/';
import ThumbGallery from '../../containers/MainGallery';

import { withStacking } from '../higherOrder/withStacking';
import StackBoundary  from './StackBoundary';

import './stack.scss';

/**
 * Makes accordion of stacked components
 */
export default props => {

  const { galleryImages, primaryGalleryInfo } = props;

  const StackedGallery = withStacking(ThumbGallery);

    return (
      <div className="stacker">
        <StackBoundary>
          <Accordion defaultActiveKey="gallery">

          {primaryGalleryInfo && (
            <Explan  
              fullText={primaryGalleryInfo} 
              eventKeyName="explan"
              variant="dark"
              cardTitle="About Album" 
              enabled={primaryGalleryInfo && 1}
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
          
          </Accordion>
        </StackBoundary>
      </div>
    )
}


