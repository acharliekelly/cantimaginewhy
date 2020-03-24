import React from 'react';
import { storiesOf } from '@storybook/react';
import ContactLinks from './';
import { initializeLibrary } from '../../utils/faLibrary';


import './links.scss';

initializeLibrary();

const stories = storiesOf('ContactLinks', module);
stories
  .add('Text', () => <ContactLinks displayType="text" layout="vert" />)
  .add('Icon', () => <ContactLinks displayType="icon" size={2} layout="horiz" />)
  .add('Both', () => <ContactLinks displayType="both" layout="vert" size={3} />)
  .add('Hidden', () => <ContactLinks displayType="hide" layout="vert" size={4} />)
