import React from 'react';
import { storiesOf } from '@storybook/react';
import Explan from '.';
import Accordion from 'react-bootstrap/Accordion';

import { albums } from '../../config/albums';

import 'bootstrap/dist/css/bootstrap.min.css';

const stories = storiesOf('Explan', module);
stories.add('default', () => (
  <div style={{width: '20rem'}}>
    <Accordion>
      <Explan tagObject={albums[0]} />
    </Accordion>
  </div>
)).add('multiple', () => {
  const arr = albums.slice(0, 10);
  return (
  <div style={{width: '20rem'}}>
    <Accordion defaultActiveKey="0">
      {arr.map((tagob, index) => (
        <Explan key={index} tagObject={tagob} stackPosition={index} cardTitle={tagob.name} />
      ))}
    </Accordion>
  </div>
  )
})
