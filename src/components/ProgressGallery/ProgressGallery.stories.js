import React from 'react';
import { storiesOf } from '@storybook/react';
import { Image } from 'cloudinary-react';
import ProgressGallery from './';

import './process.scss';

const mockRef = 'memorial_drive';

const selectLightbox = imageId => {
  console.log('open lightbox for image: ' + imageId);
}


const stories = storiesOf('ProgressGallery', module);

stories.add('Progress Gallery', () => {
  return (
    <div className="story">
      <Image 
        className="display-image"
        cloudName="cantimaginewhy"
        publicId="art/memorial_drive"
        height="400"
      />
    
      <ProgressGallery refKey={mockRef} selectLightbox={selectLightbox} imageHeight={60} />
    </div>
  )
})
