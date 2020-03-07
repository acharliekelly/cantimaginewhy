import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios, number } from '@storybook/addon-knobs';
import { Image } from 'cloudinary-react';
import ProgressGallery from './';

import './process.scss';

const selectLightbox = imageId => {
  console.log('open lightbox for image: ' + imageId);
}

// Image Height slider
const imageHeightLabel = 'Image Height';
const imageHeightDefault = 80;
const imageHeightOptions = {
  range: true,
  min: 20,
  max: 200,
  step: 20
};

// Display image selector
const displayImageLabel = 'Display Image';
const displayImageDefault = 'memorial_drive';
const displayImageOptions = {
  'Memorial Drive': 'memorial_drive',
  'Dunster': 'dunster',
  'Waltham Waterfall': 'waltham_waterfall',
  'First Parish': 'first_parish',
  'Fall Footbridge': 'fall_footbridge'
}


const stories = storiesOf('ProgressGallery', module);
stories.addDecorator(withKnobs);

stories.add('Basic', () => {
  return (
    <div className="story">
      <Image 
        className="display-image"
        cloudName="cantimaginewhy"
        publicId="art/memorial_drive"
        height="400"
      />
    
      <ProgressGallery 
        refKey="memorial_drive" 
        selectLightbox={selectLightbox} 
        imageHeight={60} />
    </div>
  )
})
  .add('Options', () => {
    const displayImage = radios(displayImageLabel, displayImageOptions, displayImageDefault);
    const sizeSlider = number(imageHeightLabel, imageHeightDefault, imageHeightOptions);
    return (
      <div className="story">
        <Image 
          className="display-image" 
          cloudName="cantimaginewhy" 
          publicId={'art/' + displayImage} 
          height="400" />

        <ProgressGallery 
          refKey={displayImage} 
          selectLightbox={selectLightbox} 
          imageHeight={sizeSlider} />        
      </div>
    )
  })
