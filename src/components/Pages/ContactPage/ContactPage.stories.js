import React from 'react';
import { storiesOf } from '@storybook/react';
import ContactPage from '.';
import { contactText } from '../../../api/js/text';

import './contact.scss';

const stories = storiesOf('Contact Page', module);
stories.add('default', () => (
  <ContactPage contactText={contactText} />
))