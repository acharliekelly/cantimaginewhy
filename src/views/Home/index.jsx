import React from 'react';
import { Image } from 'cloudinary-react';
import SliceGallery from '../../components/SliceGallery';

import './home.scss'; 

const HomePage = props => {
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
            {...props}
          />
        </div>
        
      </main>
    </div>
  );
}


export default HomePage;
