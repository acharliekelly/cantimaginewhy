import React from 'react';
import { Image } from 'cloudinary-react';
// import ImageCarousel from './ImageCarousel';
// import RandomGallery from './RandomGallery';
import SimpleGallery from './SimpleGallery';
import '../css/home.scss';


export default function Home() {
  
   return (
      <div className="content">
        <main className="home">
          
          {/* <ImageCarousel tagName="panorama" /> */}
          <Image cloudName="cantimaginewhy" publicId="art/boston-tetraptych_2012" height="300" />

          <div className="featured">
            <h3 className="header">Featured Artwork</h3>
            <SimpleGallery 
              tagName="favorite" 
              imageHeight={200} 
              handleImageClick={ev => console.log('image clicked: ' + ev.target)}
              gallerySize={3}
            />
          </div>
          
        </main>
      </div>
    );
}

