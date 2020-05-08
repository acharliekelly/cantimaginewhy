import React from 'react';
import { storiesOf } from '@storybook/react';
import { TestBreakpoints } from './TestBreakpoints';
import { initSocks } from '../../utils/system';


const stories = storiesOf('Breakpoints', module);
initSocks();
stories.add('default', () => (
  <TestBreakpoints />
))
