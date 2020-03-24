import React from 'react';
import { storiesOf } from '@storybook/react';
import AlbumNav from './';

import '../../css/nav.scss';

const mockNavChange = tagName => {
  console.log('Album has changed to ' + tagName);
}

const mockClearGallery = () => {
  console.log('Gallery cleared');
}

const stories = storiesOf('AlbumNav', module);
stories.add('Album Navigation', () => (
  <AlbumNav 
    updateSelectNav={mockNavChange} 
    updateClearGallery={mockClearGallery}  
  />
));
