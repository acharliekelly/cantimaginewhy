import React from 'react';
import { storiesOf } from '@storybook/react';
import ContactLinks from './';
import { initializeLibrary } from '../../utils/faLibrary';

import 'bootstrap/dist/css/bootstrap.min.css';
import './links.scss';

initializeLibrary();

const stories = storiesOf('ContactLinks', module);
stories
  .add('Text', () => <ContactLinks displayType="text" />)
  .add('Icon', () => (
    <div style={{width: '300px'}}>
      <ContactLinks displayType="icon" size="lg" horizontal="md" />
    </div>
  ))
  .add('Both', () => <ContactLinks displayType="both" size="3x" textSize="3em" />)
  .add('Hidden', () => <ContactLinks displayType="hide" size="4x" textSize="3em" />)
  .add('Full', () => <ContactLinks displayType="full" size="2x" textSize="2em" />)
  .add('Collapse on Lg', () => (
    <div style={{width: '50%'}}>
      <ContactLinks size="md" horizontal="lg" />
    </div>
  ))
