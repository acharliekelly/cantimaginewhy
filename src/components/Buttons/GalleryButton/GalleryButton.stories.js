import React from 'react';
import { storiesOf } from '@storybook/react';
import GalleryButton from '.';

import { albums } from '../../../api/js/albums';

import '../../Navs/nav.scss';

const gallery = albums[2];

const tagHandler = tagName => { console.log('tag: ', tagName)}

const stories = storiesOf('GalleryButton', module);
stories.add('Default', () => (
  <GalleryButton navGallery={gallery} selectHandler={tagHandler} />
))