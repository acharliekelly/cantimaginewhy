import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, radios } from '@storybook/addon-knobs';
import FilteredGallery from './';

// const tags = {
//   Favorite: 'favorite', 
//   PleinAir: 'en plein air', 
//   Watercolor: 'watercolor', 
//   Triptych: 'triptych',
//   Summer: 'summer'
// }

const stories = storiesOf('FilteredGallery', module);
// stories.addDecorator(withKnobs);

stories
  .add('Default', () => <FilteredGallery currentAlbum="favorite" />)
  // .add('Options', () => {
  //   const options = radios('Tags', tags, 'favorite');
  //   return <FilteredGallery currentAlbum={options} />
  // })
