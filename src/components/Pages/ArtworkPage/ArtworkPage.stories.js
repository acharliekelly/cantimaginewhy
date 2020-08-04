import React from 'react';
import { storiesOf } from '@storybook/react';
import ArtworkPage from '.';

import { albums } from '../../../api/js/albums';

const gallery = albums[1];

const stories = storiesOf('ArtworkPage', module);
stories.add('Scenery', () => (
  <ArtworkPage selectedGallery={gallery} />
))