import React from 'react';
import { storiesOf } from '@storybook/react';
import BoundGallery from './';
import { sortByField } from '../../utils/imageApi';
import { resources } from '../../../data/acrylic.json';

const images = sortByField(resources, '.caption');

const mockSelect = index => {
  console.log(images[index].public_id + ' selected');
}

const stories = storiesOf('BoundGallery', module);
stories.add('basic', () => (
  <BoundGallery galleryImages={images} selectThumbnail={mockSelect} thumbSize={80} />
))
