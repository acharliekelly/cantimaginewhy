import React from 'react';
import { Router } from '@reach/router';
// import ArtRouter from './ArtRouter';
import ConnectPage from '../pages/Connect';
import { HomePage } from '../pages/Home';
import { AboutPage, AboutSection } from '../pages/About';
import ArtworkPage from '../pages/Artwork';

const FilterPage = props => (
  <ArtworkPage view="filter" {...props} />
)

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
    

    <ArtworkPage path="artwork">
      <ArtworkPage path="albums" />
      <ArtworkPage path="album/:album" />
      
    </ArtworkPage>
    
    
    <FilterPage path="artwork/filters" />
    <FilterPage path="artwork/filters/:index" />
    <FilterPage path="artwork/filter/:filter" />
    

  </Router>
);

export default PageRouter;