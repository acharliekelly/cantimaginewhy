import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageGallery from './';

import './gallery.scss';

const mockAlbum = {
  "name": "Scenery",
  "tag": "scenery",
  "thumbnail": "art/midwinter",
  "description": "Painted from a photograph",
  "sortField": ".year"
}

const stories = storiesOf('ImageGallery', module);
stories.add('Gallery', () => <ImageGallery currentAlbum={mockAlbum} isGalleryEmpty={false} />)
