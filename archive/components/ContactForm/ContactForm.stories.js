import React from 'react';
import { storiesOf } from '@storybook/react';
import { ContactForm, StatefulContactForm } from '.';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css


const stories = storiesOf('ContactForm', module);

stories
  .add('Normal Contact Form', () => <ContactForm />)
  .add('Stateful Contact Form', () => <StatefulContactForm />)
  