import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, radios, text, number } from '@storybook/addon-knobs';
import AlbumGallery from './';

import '../FilteredGallery/filtered-gallery.scss';

const stories = storiesOf('AlbumGallery', module);

stories.add('Default', () => <AlbumGallery />)
