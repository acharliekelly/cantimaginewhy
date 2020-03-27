import React from 'react';
import { storiesOf } from '@storybook/react';
import AlbumNav from './';

import 'bootstrap/dist/css/bootstrap.min.css';

const mockNavChange = tagName => {
  console.log('Album has changed to ' + tagName);
}

const mockClearGallery = () => {
  console.log('Gallery cleared');
}

const mockSwitch = () => {
  console.log('Switch to Filter')
}

const stories = storiesOf('AlbumNav', module);
stories.add('Album Navigation', () => (
  <AlbumNav 
    updateSelectNav={mockNavChange} 
    updateClearGallery={mockClearGallery}
    updateSwitch={mockSwitch}
  />
));
