import React from 'react';
import { storiesOf } from '@storybook/react';
import ProductButton from '.';

const imgId = 'art/first_parish';

const stories = storiesOf('Buttons', module);
stories.add('Product Button', () => (
  <div style={{width: '100%', textAlign: 'center'}}>
    <span style={{marginRight: '5em'}}>Product: "First Parish"</span>
    <ProductButton imageId={imgId} />
  </div>
));
