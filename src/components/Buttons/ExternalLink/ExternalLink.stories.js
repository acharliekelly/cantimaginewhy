import React from 'react';
import { storiesOf } from '@storybook/react';
import ExternalLink from '.';

const stories = storiesOf('ExternalLink', module);
stories.add('Facebok link', () => (
  <ExternalLink 
    destinationUrl="https://facebook.com/acharliekelly" 
    placement="bottom">
      Facebook
    </ExternalLink>
  ))
  .add('Shop link', () => (
    <ExternalLink
      destinationUrl="https://charlie-kelly.pixels.com/"
      variant="outline-info"
      placement="right"
      showIcon>Shop</ExternalLink>
  ))
  .add('Link only', () => (
    <ExternalLink 
      destinationUrl="https://linkedin.com/in/acharliekelly" 
      placement="bottom" 
      linkOnly>LinkedIn</ExternalLink>
  ))
