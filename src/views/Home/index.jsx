import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { selectLightboxUtil } from '../../utils/imageUtils';
import SimpleGallery from '../../components/SimpleGallery/';

import './home.scss'; 

const HomePage = props => {
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
            selectLightbox={props.selectLightbox}
          />
        </div>
        
      </main>
    </div>
  );
}

HomePage.propTypes = {
  selectLightbox: PropTypes.func.isRequired
}

HomePage.defaultProps = {
  selectLightbox: selectLightboxUtil
}

export default HomePage;
