import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios, number} from '@storybook/addon-knobs';
import Stacker from '.';

import { albums } from '../../json/albums';
// import { fetchGallery } from '../../utils/cloudinaryApi'; 

// import { createGalleryFromTagName } from '../../utils/tagUtils';
import { resources } from '../../../data/acrylic.json';

const tags = {
  PleinAir: 'plein-air-acrylic', 
  Scenery: 'scenery-loc', 
  Landscape: 'scenery-noloc', 
  Portrait: 'portrait-new',
  Logos: 'logo'
}

const thumbSizes = {
  range: true,
  min: 20,
  max: 100,
  step: 10
}

const mockSelect = index => {
  console.log(`image ${index} clicked`);
}

const stories = storiesOf('Stacker', module);
stories.addDecorator(withKnobs);
stories
  .add('Normal', () => (
    <div style={{width: '50%'}}>
      <Stacker 
        tagObject={albums[0]}
        galleryImages={resources}
        selectThumbnail={mockSelect}
      />
    </div>
  ))
  .add('Mobile', () => {
    const thumbOpts = number('Thumbnail Size', 60, thumbSizes);
    const tagOpts = radios('Album', tags, 'plein-air-acrylic');
    let gallery = resources;
    return (
      <div style={{width: '35%'}}>
        <Stacker 
          updateSelectNav={tag => console.log(`selected ${tag}`)}
          tagObject={tagOpts} 
          thumbSize={thumbOpts}
          galleryImages={gallery}
          selectThumbnail={mockSelect}
          isFullWidth={true} 
          />
      </div>
    )
  })

