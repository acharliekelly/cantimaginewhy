import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageToolbar from './';

import '../../css/main.scss';

const stories = storiesOf('ImageToolbar', module);
stories
  .add('default', () => <ImageToolbar />)
  .add('settings', () => (
    <ImageToolbar 
      variant="info" 
      toolbarClass="test"
      imgSize="4x" />
  ))
