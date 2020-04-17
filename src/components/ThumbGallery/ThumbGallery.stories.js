import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import ThumbGallery from './';
import { sortByField } from '../../utils/imageApi';
import { resources } from '../../../data/acrylic.json';

import './gallery.scss';

const images = sortByField(resources, '.caption');

// const mockNav = {
//   name: 'Acrylic',
//   description: 'Layered acrylic paints'
// }

const mockSelect = index => {
  console.log(images[index].public_id + ' selected');
}

// thumb size slider
const sizeCtrl = {
  range: true,
  max: 200,
  min: 20,
  step: 20
}
const indexCtrl = {
  range: true,
  max: 43,
  min: 0,
  step: 1
}

const stories = storiesOf('ThumbGallery', module);
stories.addDecorator(withKnobs);
stories
.add('Basic', () => (
  <ThumbGallery  
    galleryImages={images}
    selectThumbnail={mockSelect}
    thumbSize={80}
  />))
  .add('Knobs', () => {
    const sizes = number('Thumbnail Size', 100, sizeCtrl);
    const selected = number('Selected', 0, indexCtrl);
    return (
      <ThumbGallery 
        galleryImages={images} 
        selectThumbnail={mockSelect} 
        thumbSize={sizes}
        imageIndex={selected} 
      />
    )
    
  })
