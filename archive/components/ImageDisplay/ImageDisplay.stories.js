import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageDisplay from './';

import { resources } from '../../../data/acrylic.json';


const stories = storiesOf('ImageDisplay', module);

stories
  .add('Static Display', () => (
    <ImageDisplay 
      currentImage={resources[2]} 
      moveNext={() => console.log('next >>')} 
      movePrevious={() => console.log('<< prev')} 
    />
  ))
  .add('Dynamic List', () => {
    let imgIndex = 0;
    const mNext = () => { 
      imgIndex = (imgIndex + 1) % resources.length
    }
    const mPrev = () => { 
      imgIndex = (imgIndex + resources.length - 1) % resources.length 
    }

    return (
      <ImageDisplay
        imageIndex={imgIndex} 
        moveNext={mNext} 
        movePrevious={mPrev} 
        imageList={resources}
      />
    )
})
