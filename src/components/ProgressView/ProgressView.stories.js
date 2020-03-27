import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, radios, number } from '@storybook/addon-knobs';
import ProgressView from '.';

import 'bootstrap/dist/css/bootstrap.min.css';

const testRef = 'waltham_waterfall';

const stories = storiesOf('ProgressGallery', module);
// stories.addDecorator(withKnobs);

stories.add('Default', () => (
  <div className="story">
    <ProgressView refKey={testRef} />
  </div>
  
))
