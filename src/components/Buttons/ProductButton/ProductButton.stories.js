import React from 'react';
import { storiesOf } from '@storybook/react';
import ProductButton from '.';


const stories = storiesOf('Buttons', module);
stories.add('Product Button: default', () => (
  <div style={{width: '100%', textAlign: 'center'}}>
    <span style={{marginRight: '5em'}}>Product: "First Parish"</span>
    <ProductButton productKey={'first-parish'} />
  </div>
)).add('Product Btn: Options', () => (
  <div style={{width: '100%', textAlign: 'center'}}>
    <span style={{marginRight: '5em'}}>Product: "Cambridge Hyatt"</span>
    <ProductButton productKey={'cambridge-hyatt'} variant="info" size="4x" buttonText="Suck It!" />
  </div>
))
