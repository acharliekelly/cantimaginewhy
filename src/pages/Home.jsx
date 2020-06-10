import React from 'react';
// import Container from 'react-bootstrap/Container';
import { Image } from 'cloudinary-react';
import SliceGallery from '../components/SliceGallery';

import './page.scss';

export const HomePage = () => (
  <div className="content home">
    <main>
      <Image className="banner" 
        publicId="art/boston-tetraptych_2012" 
        width={800} 
      />

      <div className="featured">
        <div className="header">Featured Artwork</div>
        <SliceGallery 
          tagName="favorite" 
          imageHeight={200} 
          gallerySize={4} />
      </div>
      
    </main>
  </div>
);