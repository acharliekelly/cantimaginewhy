import React from 'react';
import { storiesOf } from '@storybook/react';
import { ContactForm } from '.';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css


const stories = storiesOf('ContactForm', module);

stories.add('Contact Form', () => <ContactForm />)
  