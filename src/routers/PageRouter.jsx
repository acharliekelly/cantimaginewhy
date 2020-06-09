import React from 'react';
import { Router } from '@reach/router';

import ContactPage from '../views/Contact';
import HomePage from '../views/Home';
import AboutPage from '../views/About';

// import ArtRouter from './ArtRouter';
import ArtworkPage from '../views/Artwork';

/**
 * Reach router Page navigation
 */
const PageRouter = () => (
  <Router>
    <HomePage path="/" />
    <AboutPage path="about" />
    <ContactPage path="connect" />
    <ArtworkPage path="artwork" />
  </Router>
);


export default PageRouter;