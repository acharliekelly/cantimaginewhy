import React from 'react';

import ImageCarousel from './ImageCarousel';
import SimpleGallery from './SimpleGallery';
import '../css/home.scss';


export default function Home() {
  
   return (
      <div className="content">
        <main>
          
          <ImageCarousel tagName="panorama" />

          <div className="featured">
            <h3>Featured Artwork</h3>
            <SimpleGallery 
              tagName="favorite" 
              imageWidth="200" 
              handleImageClick={ev => console.log('image clicked: ' + ev.target)}
              gallerySize="4" 
            />
          </div>
          
        </main>
      </div>
    );
}

