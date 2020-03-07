import React from 'react';
import { storiesOf } from '@storybook/react';
import SocialMediaLinks from './';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import './social.scss';

const stories = storiesOf('SocialMediaLinks', module);
library.add(fab);
stories.add('with FontAwesome', <SocialMediaLinks />);
