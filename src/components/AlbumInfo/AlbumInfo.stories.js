import React from 'react';
import { storiesOf } from '@storybook/react';
import AlbumInfo from '.';
import Accordion from 'react-bootstrap/Accordion';

import { albums } from '../../api/js/albums';

import './bootstrap/dist/css/bootstrap.min.css';

const stories = storiesOf('AlbumInfo', module);
stories.add('default', () => (
  <div style={{width: '20rem'}}>
    <Accordion>
      <AlbumInfo tagObject={albums[0]} />
    </Accordion>
  </div>
)).add('multiple', () => {
  const arr = albums.slice(0, 10);
  return (
  <div style={{width: '20rem'}}>
    <Accordion defaultActiveKey="0">
      {arr.map((tagob, index) => (
        <AlbumInfo key={index} tagObject={tagob} cardTitle={tagob.name} />
      ))}
    </Accordion>
  </div>
  )
})
// .add('stacked', () => {
//   const Stacked = withStacking(AlbumInfo);
//   return (
//     <div style={{width: '20rem'}}>
//       <Accordion defaultActiveKey="explan-0">
//         {albums.map((album, index) => (
//           <Stacked 
//             key={index} 
//             tagObject={album} 
//             cardTitle={album.name} 
//             eventKeyName={`explan-${index}`} 
//           />
//         ))}
//       </Accordion>
//     </div>
//   )
// })
