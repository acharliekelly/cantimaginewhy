import React, { useState } from 'react';
import { 
  HashRouter as Router, 
  Route
} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import Lightbox from 'react-image-lightbox';

import Menu from './components/Menu/';
import ContactPage from './views/Contact/';
import Footer from './components/Footer/';
import HomePage from './views/Home/';
import AboutPage from './views/About/';
import ArtworkPage from './views/Artwork';
import { lightboxImageSrc } from './utils/imageApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';
import 'react-image-lightbox/style.css';




const App = () => {
  const [ lightboxOpen, setLightboxOpen ] = useState(false);
  const [ selectedImageId, setSelectedImageId ] = useState('');

  /**
   * takes CPI from any child component, opens lightbox
   * @param {*} imageId 
   */
  const selectLightboxImage = imageId => {
    setSelectedImageId(imageId);
    setLightboxOpen(true);
  }

  const closeLightbox = () => {
    setSelectedImageId('');
    setLightboxOpen(false);
  }

  library.add(fab, faChevronCircleLeft, faChevronCircleRight);
  return (
    <div className="page-container">
      <Router basename='/'>
        <Menu />
        <div className="content-wrapper">
          <Route exact path="/" component={<HomePage selectLightbox={selectLightboxImage} />} />
          <Route path="/home" component={<HomePage selectLightbox={selectLightboxImage} />} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/artwork" component={<ArtworkPage selectLightbox={selectLightboxImage} />} />
        </div>
      </Router>
      <Footer />
      { lightboxOpen && (
        <Lightbox 
          mainSrc={lightboxImageSrc(selectedImageId)}
          onCloseRequest={closeLightbox}
          discourageDownloads
      />
      )}
    </div>
  );
}

export default App;
