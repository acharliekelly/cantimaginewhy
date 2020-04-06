import React from 'react';
import { storiesOf } from '@storybook/react';

import Stacker from '.';

import { albums } from '../../config/albums';
import { resources } from '../../../data/scenery.json';


const album =  albums[1];
// const images = createGalleryFromTag(album);

const stories = storiesOf('Stacker', module);
stories.add('Plein Air', () => (
  <div style={{width: '50%'}}>
    <Stacker 
      tagObject={album}
      galleryImages={resources}
      selectThumbnail={index => console.log(`image ${index} clicked`)}
    />
  </div>
))
