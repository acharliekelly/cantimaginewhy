import React from 'react';
import { storiesOf } from '@storybook/react';

import Accordion from 'react-bootstrap/Accordion';
import StackGallery from '.';
import Explan from '../Explan';
// import ProgressView from '../ProgressView/alt';
import { sortByField } from '../../utils/imageApi';
import { resources } from '../../../data/scenery.json';


import './sgal.scss';

const images = sortByField(resources, '.caption');

const mockNav = {
  name: 'Scenery',
  tag: 'scenery',
  description: 'Created from a photo'
}

const mockSelect = index => {
  console.log(images[index].public_id + ' selected');
}


const stories = storiesOf('StackGallery', module);
stories.add('Gallery Only', () => (
  <Accordion>
    <StackGallery  
      galleryImages={images}
      selectThumbnail={mockSelect}
      thumbSize={80}
      stackPosition={1}
      tagOb={mockNav}
    />
  </Accordion>
  )).add('Full List', () => (
    <div style={{width: '50%', textAlign: 'center'}}>
      <Accordion>
        <Explan tagOb={mockNav} stackPosition={0} />
        <StackGallery 
          galleryImages={images} 
          selectThumbnail={mockSelect} 
          thumbSize={60}
          heading={mockNav}
          stackPosition={1}
          tagOb={mockNav}
        />
        
      </Accordion>
    </div>
    
    
  ))
  
