import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, radios, number } from '@storybook/addon-knobs';
import Accordion from 'react-bootstrap/Accordion';
import ProgressView from '.';

import 'bootstrap/dist/css/bootstrap.min.css';

const testRef = 'waltham_waterfall';

const stories = storiesOf('ProgressView', module);
// stories.addDecorator(withKnobs);

stories.add('Default', () => (
  <div className="story">
    <Accordion>
      <ProgressView refKey={testRef} />
    </Accordion>
  </div>
  
))
