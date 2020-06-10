import React from 'react';
import { Router } from '@reach/router';

import ConnectPage from '../pages/Connect';
import { HomePage } from '../pages/Home';

import { AboutPage, AboutSection } from '../pages/About';

import ArtworkPage from '../views/Artwork';

/**
 * Reach router Page navigation
 */
const PageRouter = () => (
  <Router>
    <HomePage path="/" />
    <AboutPage path="about" />
    <AboutSection path="about/:sectionId" />
      
    
    <ConnectPage path="connect" />
    <ConnectPage path="connect/:sectionId" />

    <ArtworkPage path="artwork" />

  </Router>
);

export default PageRouter;