import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressGallery from './';

import '../../css/main.scss';

const mockRef = 'public_garden_2';


const stories = storiesOf('ProgressGallery', module);

stories.add('Progress Gallery', () => {
  return (
    <ProgressGallery refKey={mockRef} />
  )
})
