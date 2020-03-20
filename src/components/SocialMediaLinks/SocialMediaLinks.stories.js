import React from 'react';
import { storiesOf } from '@storybook/react';
import SocialMediaLinks from './';
// import { cloudinaryLinks } from './';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import './social.scss';

library.add(fab);

const stories = storiesOf('SocialMediaLinks', module);

stories.add('FontAwesome', <SocialMediaLinks />);
