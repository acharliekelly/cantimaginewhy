import React from 'react';
import { storiesOf } from '@storybook/react';
import EnvMode from './';
import { initializeLibrary } from '../../utils/faLibrary';

import './mode.scss';

const mockDevMode = () => {
  console.log('Dev Mode Toggled');
}

initializeLibrary();

const stories = storiesOf('EnvMode', module);
stories
  .add('Text', () => <EnvMode type="text" devMode={mockDevMode}/>)
  .add('Icon', () => <EnvMode type="icon" devMode={mockDevMode}/>)
