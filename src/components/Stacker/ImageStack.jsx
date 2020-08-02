import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ImageInfo from '../../containers/ImageInfo';
import ProgressView from '../../containers/ProgressView';
import GeoView from '../../containers/GeoView';

// TODO: create RelatedGalleries & ProductView

// import { withStacking } from '../higherOrder/withStacking';
import StackBoundary from './StackBoundary';

import './stack.scss';

/**
 * Makes accordion of stacked components
 */
export default props => {
  
  return (
    <div className="stacker">
      <StackBoundary>
        <Accordion defaultActiveKey="info">
          <ImageInfo eventKeyName="info" />
          <ProgressView eventKeyName="progress" />
          <GeoView eventKeyName="geo" />
          { /* // TODO: Product, Related */}
        </Accordion>
      </StackBoundary>
    </div>
  )

}
