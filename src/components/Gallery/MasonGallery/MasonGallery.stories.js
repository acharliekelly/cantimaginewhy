import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import MasonGallery from '.';
import { resources } from '../../../../data/acrylic.json'

const scaleCtrl = {
  range: true,
  max: 1,
  min: 0.1,
  step: 0.1
}

const stories = storiesOf('MasonGallery', module);
stories.addDecorator(withKnobs);
stories
  .add('Default', () => (
    <MasonGallery galleryImages={resources} />
  ))
  .add('Scaled', () => {
    const scale = number('Scale', 0.5, scaleCtrl);
    return <MasonGallery galleryImages={resources} scaleFactor={scale} />
  })
  

