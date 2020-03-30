import React from 'react';
import { storiesOf } from '@storybook/react';
import ExternalLink from '.';

const stories = storiesOf('ExternalLink', module);
stories.add('Facebok link', () => (
  <ExternalLink 
    destinationUrl="https://facebook.com/acharliekelly" 
    linkText="Facebook" 
    placement="bottom" 
  />
  ))
  .add('Shop link', () => (
    <ExternalLink
      destinationUrl="https://charlie-kelly.pixels.com/"
      linkText="Shop"
      variant="outline-info"
      placement="right"
      showIcon
    />
  ))
