import React from 'react';
import { Image } from 'cloudinary-react';
import SliceGallery from 'Comps/SliceGallery';

import './home.scss'; 

const HomePage = () => {
  return (
    <div className="content">
      <main className="home">

        <Image className="banner" 
          cloudName="cantimaginewhy" 
          publicId="art/boston-tetraptych_2012" 
          width={800} 
        />

        <div className="featured">
          <h3 className="header">Featured Artwork</h3>
          <SliceGallery 
            tagName="favorite" 
            imageHeight={200} 
            gallerySize={4}
          />
        </div>
        
      </main>
    </div>
  );
}


export default HomePage;
