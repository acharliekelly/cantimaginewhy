import React from 'react';
import { storiesOf } from '@storybook/react';
import EnvMode from './';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faCog, faHeart } from '@fortawesome/free-solid-svg-icons';

import './mode.scss';

const mockDevMode = () => {
  console.log('Dev Mode Toggled');
}

library.add(faCheck, faCog, faHeart);

const stories = storiesOf('EnvMode', module);
stories
  .add('Text', () => <EnvMode type="text" devMode={mockDevMode}/>)
  .add('Icon', () => <EnvMode type="icon" devMode={mockDevMode}/>)
