import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios, text } from '@storybook/addon-knobs';
import SimpleGallery from './';

const tags = {
  Favorite: 'favorite', 
  PleinAir: 'en plein air', 
  Watercolor: 'watercolor', 
  Triptych: 'triptych',
  Summer: 'summer'
}
const gallerySizes = {
  Small: 2,
  Medium: 4,
  Large: 6
}
const heights = {
  Tiny: 60,
  Small: 100,
  Medium: 200,
  Large: 300,
  Huge: 500
}

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
    const sizeText = text('Gallery Size', '4');
    const heightText = text('Image Height', '200');
    return (
      <SimpleGallery tagName={tagText} imageHeight={heightText} gallerySize={sizeText} />
    )
  })
  .add('Gallery with options', () => {
    const tagOptions = radios('Tag', tags, 'favorite');
    const sizeOptions = radios('Gallery Size', gallerySizes, 4);
    const heightOptions = radios('Image Height', heights, 200);
    return (
      <SimpleGallery tagName={tagOptions} gallerySize={sizeOptions} imageHeight={heightOptions} />
    )
  })
