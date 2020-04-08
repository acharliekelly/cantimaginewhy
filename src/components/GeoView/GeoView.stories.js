import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from 'react-bootstrap/Accordion';
import { StackedLorem } from '../Buttons/LoremCard';
import GeoView from '.';
import { withStacking } from '../higherOrder/withStacking';


const mockGeo = '42.3776586,-71.2347889';
// const mockId = 'art/first_parish';
// const position = {
//   lat: 42.3776586,
//   lng: -71.2347889
// }
const GeoStack = withStacking(GeoView);
const stories = storiesOf('GeoView', module);
stories.add('geotag', () => (
  <Accordion defaultActiveKey={0}>
    <StackedLorem index={0}/>
    <GeoStack cardTitle="Location" eventKeyName="geo" variant="primary" geoTag={mockGeo} />
  </Accordion>
 ))
  
