import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageDisplay from './';

const mockImage = {
  "public_id": "art/fall_footbridge",
  "version": 1572297634,
  "format": "jpg",
  "width": 3747,
  "height": 2828,
  "type": "upload",
  "created_at": "2019-10-28T21:20:34Z",
  "context": {
    "custom": {
    "alt": "View of footbridge from Watertown Dam, October",
    "caption": "Fall Footbridge",
    "key": "fall_footbridge",
    "location": "Watertown, MA",
    "medium": "acrylic on canvas",
    "original": "available",
    "price": "250",
    "size": "12\" x 9\"",
    "year": "2019"
    }
  }
}

const mockNext = () => { console.log('Moved to next image')}
const mockPrevious = () => { console.log('Move to previous image')}

const stories = storiesOf('ImageDisplay', module);

stories.add('Image Display', () => {
  return (
    <ImageDisplay 
      currentImage={mockImage} 
      moveNext={mockNext} 
      movePrevious={mockPrevious} 
    />
  )
})
