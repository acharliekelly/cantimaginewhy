import React from './react';
// import StackLayer from '../Stacker/StackLayer';
import { withStacking } from '../higherOrder/withStacking';


/**
 * Should fit into Accordion Card Stack (left-nav)
 * @param {*} props 
 */
const AlbumInfo = ({ tagName, explanText }) => !!explanText && (
  <div>
    <header className="album-title">{tagName}</header>
    <main className="album-description">
      {explanText}
    </main>
  </div>
);

export default withStacking(AlbumInfo);
