import React from 'react';
import { Image } from 'cloudinary-react';

import SimpleGallery from './SimpleGallery';

import '../css/home.scss'; 

export default function Home() {
  return (
    <div className="content">
      <main className="home">

        <Image cloudName="cantimaginewhy" publicId="art/boston-tetraptych_2012" height={300} />

        <div className="featured">
          <h3 className="header">Featured Artwork</h3>
          <SimpleGallery 
            tagName="favorite" 
            imageHeight={200} 
            gallerySize={3}
          />
        </div>
        
      </main>
    </div>
  );
}

