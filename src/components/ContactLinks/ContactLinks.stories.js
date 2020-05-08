import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import ContactLinks from './';
import { initializeLibrary } from '../../utils/faLibrary';

import 'bootstrap/dist/css/bootstrap.min.css';
import './links.scss';

initializeLibrary();

const groups = {
  Head: 'head',
  Art: 'art',
  Design: 'design',
  Code: 'tech'
}

const stories = storiesOf('ContactLinks', module);
stories.addDecorator(withKnobs);
stories
  .add('Text', () => <ContactLinks displayType="text" />)
  .add('Icon', () => (
    <div style={{width: '300px'}}>
      <ContactLinks displayType="icon" size="lg" horizontal="md" />
    </div>
  ))
  .add('Both', () => <ContactLinks displayType="both" size="3x" textSize="3em" />)
  .add('Full', () => <ContactLinks displayType="full" size="2x" textSize="2em" />)
  .add('Groups', () => {
    const groupOptions = radios('Group', groups, 'head');
    return (
      <ContactLinks displayType="full" size="2x" textSize="2em" group={groupOptions} />
    )
  })
