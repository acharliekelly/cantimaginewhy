import React from 'react';
import { storiesOf } from '@storybook/react';
import FilterNav from './';

const mockNavChange = tagName => {
  console.log('Filter has changed to ' + tagName);
}

const mockClearGallery = () => {
  console.log('Gallery cleared');
}

const stories = storiesOf('FilterNav', module);
stories.add('Filter Navigation', () => (
  <FilterNav 
    handleNavChange={mockNavChange} 
    handleClearGallery={mockClearGallery}  
  />
));