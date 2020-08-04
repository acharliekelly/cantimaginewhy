import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, number } from '@storybook/addon-knobs';
import GalleryGroup from '.';
import { albums } from '../../../api/js/albums';

import '../../Navs/nav.scss';

const stories = storiesOf('GalleryGroup', module);
stories.add('Nav', () => {
  const [selectedTag, setSelectedTag ] = useState('');
  return (
    <GalleryGroup 
      galleryList={albums} 
      isCollapsed={false} 
      isInline={true}
      selectedTag={selectedTag}
      selectTagHandler={setSelectedTag}
    />
  )
})