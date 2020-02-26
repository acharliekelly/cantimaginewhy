import React from 'react';
import { storiesOf } from '@storybook/react';
import { OrderForm } from '.';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css

const stories = storiesOf('OrderForm', module);

stories.add('OrderForm', () => {
  const image = 'art/fall_colors';
  return (
    <OrderForm imageId={image} price="50" />
  )
})
