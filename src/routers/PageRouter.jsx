import React from 'react';
import { Router } from '@reach/router';
import ArtRouter from './ArtRouter';
import ConnectPage from '../pages/Connect';
import { HomePage } from '../pages/Home';
import { AboutPage, AboutSection } from '../pages/About';


/**
 * Reach router Page navigation
 */
const PageRouter = props => (
  <Router>
    <HomePage path="/" />
    <AboutPage path="about" />
    <AboutSection path="about/:sectionId" />
      
    
    <ConnectPage path="connect" />
    <ConnectPage path="connect/:sectionId" />

    <ArtRouter path="artwork/*" />

  </Router>
);

export default PageRouter;