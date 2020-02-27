import React from 'react';
import { Image } from 'cloudinary-react';

import SimpleGallery from '../../components/SimpleGallery/';

import './home.scss'; 

const HomePage = () => {
  return (
    <div className="content">
      <main className="home">

        <Image cloudName="cantimaginewhy" publicId="art/boston-tetraptych_2012" height={300} />

        <div className="featured">
          <h3 className="header">Featured Artwork</h3>
          <SimpleGallery 
            tagName="favorite" 
            imageHeight={200} 
            gallerySize={4}
            selectLightbox={this.props.selectLightbox}
          />
        </div>
        
      </main>
    </div>
  );
}

export default HomePage;
