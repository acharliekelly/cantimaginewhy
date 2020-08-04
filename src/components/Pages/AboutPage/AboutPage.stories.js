import React from 'react';
import { storiesOf } from '@storybook/react';
import {StateLocator} from '../../../utils/constants';
import AboutPage from '.';
import * as aboutContentJson from '../../../api/json/about-text.json'

import './about.scss';

const mockAboutInfo = {
  locator: StateLocator.ABOUT_INFO,
  isFetching: false,
  currentSectionId: 'art',
  contentText: aboutContentJson,
  error: null
};

const stories = storiesOf('AboutPage', module);

stories.add('Default', () => (
  <AboutPage aboutInfo={mockAboutInfo} />
))