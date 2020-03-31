import React, { useState } from 'react';
import { 
  HashRouter as Router, 
  Route
} from 'react-router-dom';  

import Menu from './components/Menu/';
import ContactPage from './views/Contact/';
import Footer from './components/Footer/';
import HomePage from './views/Home/';
import AboutPage from './views/About/';
import ArtworkPage from './views/Artwork';
import ImageZoom from './components/ImageZoom/';
import { allowDevMode } from './utils/system';
import { initializeLibrary } from './utils/faLibrary';
import { updateFavicon } from './utils/system';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

import './css/dev.scss';


const App = () => {
  const [ lightboxOpen, setLightboxOpen ] = useState(false);
  const [ selectedImageId, setSelectedImageId ] = useState('');
  const [ lightboxImages, setLightboxImages ] = useState([]);
  const [ lightboxCurrentIndex, setLightboxCurrentIndex ] = useState(0);
  const [ developmentMode, setDevelopmentMode ] = useState(false);

  /**
   * takes CPI from any child component, opens lightbox
   * @param {*} imageId 
   */
  const selectLightboxImage = (imageId, images = [], currentIndex = -1) => {
    if (images.length > 0) {
      setLightboxImages(images);
      let idx = currentIndex;
      if (idx < 0 && imageId.length > 0) {
        idx = images.findIndex(img => img.public_id === imageId);
      } else {
        idx = 0;
      }
      setLightboxCurrentIndex(idx);
    } else {
      setSelectedImageId(imageId);
    }
    console.log('opening Zoom')
    setLightboxOpen(true);
  }

  const closeLightbox = () => {
    setSelectedImageId('');
    setLightboxImages([]);
    setLightboxCurrentIndex(0);
    setLightboxOpen(false);
  }

  const toggleDevMode = () => {
    
    if (allowDevMode()) {
      setDevelopmentMode(!developmentMode);
    }
    console.log('Dev Mode: ' + (developmentMode ? 'On' : 'Off'))
  }

  const devCls = developmentMode ? ' dev-mode' : '';

  // set Favicon according to current env
  updateFavicon();

  // Initialize FontAwesome library
  initializeLibrary();
  

  return (
    <div className={'page-container' + devCls}>
      <Router basename='/'>
        <Menu selectLightbox={selectLightboxImage} />
        <div className="content-wrapper">
          <Route exact path="/">
            <HomePage selectLightbox={selectLightboxImage} />
          </Route>
          <Route path="/home">
            <HomePage selectLightbox={selectLightboxImage} />
          </Route>
          <Route path="/about">
            <AboutPage selectLightbox={selectLightboxImage} />
          </Route>
          <Route path="/contact">
            <ContactPage selectLightbox={selectLightboxImage} />
          </Route>
          <Route path="/artwork">
            <ArtworkPage selectLightbox={selectLightboxImage} />
          </Route>
        </div>
      </Router>
      <Footer devMode={toggleDevMode} />

      { lightboxOpen && (
        <ImageZoom 
          imageList={lightboxImages}
          selectedIndex={lightboxCurrentIndex}
          selectedImageId={selectedImageId}
          closeLightbox={closeLightbox}
        />
      )}
      
       
    </div>
  );
}

export default App;
