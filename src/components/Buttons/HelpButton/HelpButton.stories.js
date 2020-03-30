import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpButton from '.';
import { loremIpsum } from '../../../../data/lorem';


const stories = storiesOf('Buttons', module);
stories.add('Help Button', () => (
  <div style={{width: '100%', textAlign: 'center'}}>
    <HelpButton header="Lorem Ipsum" size="3x" content={loremIpsum} />
  </div>
));
