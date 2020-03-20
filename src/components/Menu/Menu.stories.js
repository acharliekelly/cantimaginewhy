import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from './';

import './menu.scss';



const stories = storiesOf('Menu', module);
stories.add('default', () => <Menu />)
