import React from 'react';
import { storiesOf } from '@storybook/react';
import { OrderForm, StatefulOrderForm } from '.';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css

const image = 'art/fall_colors';

const stories = storiesOf('OrderForm', module);

stories
  .add('Order Form', () => <OrderForm imageId={image} price="50" />)
  .add('Stateful Order', () => <StatefulOrderForm imageId={image} price="100" />)

