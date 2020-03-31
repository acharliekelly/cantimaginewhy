import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from 'react-bootstrap/Accordion';
// import { StubCard } from '../Buttons/StubCard';
import Stacker from '.';
// import { resources } from '../../../data/acrylic.json';
import ThumbGallery from '../ThumbGallery';
// import ProgressView from '../ProgressView';
import Explan from '../Explan';
// import { createGalleryFromTag } from '../../utils/imageUtils';
import { albums } from '../../config/albums';
import { resources } from '../../../data/scenery.json';


const album =  albums[1];
// const images = createGalleryFromTag(album);

const stories = storiesOf('Stacker', module);
stories.add('Plein Air', () => (
  <div style={{width: '50%'}}>
    <Accordion>
      <Explan tagOb={album} stackPosition={0} />
      <Stacker tagObject={album} stackPosition={1}>
        <ThumbGallery 
          galleryImages={resources} 
          selectThumbnail={index => console.log(index + ' clicked')}
          tagOb={album} />
      </Stacker>
    </Accordion>
  </div>
))
