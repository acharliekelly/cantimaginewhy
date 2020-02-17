import React from 'react';
import { storiesOf } from '@storybook/react';
import { ContactForm } from './';



const stories = storiesOf('ContactForm', module);

stories.add('Contact Form', () => <ContactForm />)
  