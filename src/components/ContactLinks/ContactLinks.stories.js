import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import ContactLinks from '.';
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
  .add('Text', () => <ContactLinks display={2} />)
  .add('Icon', () => (
    <div style={{width: '300px'}}>
      <ContactLinks />
    </div>
  ))
  .add('Description', () => <ContactLinks display={3} />)
  .add('Groups', () => {
    const groupOptions = radios('Group', groups, 'head');
    return (
      <ContactLinks display={3} group={groupOptions} />
    )
  })
