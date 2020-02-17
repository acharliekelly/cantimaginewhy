import React from 'react';
import { storiesOf } from '@storybook/react';
import SocialMediaLinks from './';

import './social.scss';

const stories = storiesOf('SocialMediaLinks', module);
stories.add('with FontAwesome', <SocialMediaLinks />);
