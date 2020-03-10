import React from 'react';
import { storiesOf } from '@storybook/react';
import AlbumNav from './';

import '../FilterNav/filter-nav.scss';

const mockNavChange = tagName => {
  console.log('Filter has changed to ' + tagName);
}

const mockClearGallery = () => {
  console.log('Gallery cleared');
}

const stories = storiesOf('FilterNav', module);
stories.add('Filter Navigation', () => (
  <AlbumNav 
    handleNavChange={mockNavChange} 
    handleClearGallery={mockClearGallery}  
  />
));
