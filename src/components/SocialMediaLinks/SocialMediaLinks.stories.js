import React from 'react';
import { storiesOf } from '@storybook/react';
import SocialMediaLinks from './';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import './social.scss';

const stories = storiesOf('SocialMediaLinks', module);
library.add(fab, faChevronCircleLeft, faChevronCircleRight);
stories.add('with FontAwesome', <SocialMediaLinks />);
