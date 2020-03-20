import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageGallery from './';

import './gallery.scss';

const stories = storiesOf('ImageGallery', module);
stories
  .add('Filtered Gallery', () => <ImageGallery galleryType={0} />)
  .add('Album Gallery', ()=> <ImageGallery galleryType={1} />)
