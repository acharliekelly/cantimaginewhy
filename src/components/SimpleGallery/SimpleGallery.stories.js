import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios, text, number } from '@storybook/addon-knobs';
import SimpleGallery from './';

import '../../views/Home/home.scss';

const tags = {
  Favorite: 'favorite', 
  PleinAir: 'en plein air', 
  Watercolor: 'watercolor', 
  Triptych: 'triptych',
  Summer: 'summer'
}

// Gallery Size slider
const gallerySizeLabel = 'Gallery Size';
const gallerySizeDefault = 4;
const gallerySizeOptions = {
  range: true,
  min: 2,
  max: 12,
  step: 1
};

// Image Height slider
const imageHeightLabel = 'Image Height';
const imageHeightDefault = 200;
const imageHeightOptions = {
  range: true,
  min: 50,
  max: 500,
  step: 50
};


const stories = storiesOf('SimpleGallery', module);
stories.addDecorator(withKnobs);


stories
  .add('Basic Gallery', () => {
    return (
      <SimpleGallery 
        tagName="favorite" 
        imageHeight={200} 
        gallerySize={4} 
      />
    )
  })
  .add('Gallery with text', () => {
    const tagText = text('Tag', 'favorite');
    const sizeText = number('Gallery Size', 4);
    const heightText = number('Image Height', 200);
    return (
      <SimpleGallery tagName={tagText} imageHeight={heightText} gallerySize={sizeText} />
    )
  })
  .add('Gallery with knobs', () => {
    const tagOptions = radios('Tag', tags, 'favorite');
    const sizeSlider = number(gallerySizeLabel, gallerySizeDefault, gallerySizeOptions);
    const heightSlider = number(imageHeightLabel, imageHeightDefault, imageHeightOptions);
    return (
      <SimpleGallery tagName={tagOptions} gallerySize={sizeSlider} imageHeight={heightSlider} />
    )
  })
