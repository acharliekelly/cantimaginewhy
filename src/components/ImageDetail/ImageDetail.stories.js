import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import ImageDetail from '.';
import { resources } from '../../../data/acrylic.json';

import './detail.scss';

const stories = storiesOf('ImageDetail', module);
stories.addDecorator(withKnobs);
stories
  .add('Default', () => (
    <ImageDetail imageList={resources} />
  ))
  .add('Settings', () => {
    const selected = number('Selected', 1);
    return (
      <ImageDetail imageList={resources} imageIndex={selected} />
    )
  })

