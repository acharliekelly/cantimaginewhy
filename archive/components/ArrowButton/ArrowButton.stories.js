import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArrowButton } from '.';
// import './arrows.scss';

const moveDir = direction => {
  console.log('Move ' + direction);
}


const stories = storiesOf('Buttons', module);
stories.add('Arrow Buttons', () => (
  <div className="buttons">
    <ArrowButton direction="left" onClick={() => moveDir('left')} />
    <ArrowButton direction="right" color="blue" onClick={() => moveDir('right')} />
  </div>
  
));
