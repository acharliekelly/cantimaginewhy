// import React, { useState } from 'react';
import React from 'react';
import { 
  HashRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';  
import { BreakpointProvider } from 'react-socks';
import { CloudinaryContext } from 'cloudinary-react';

import Header from '../components/Header';
import ContactPage from '../components/ContactPage/';
import Footer from '../components/Footer/';
import HomePage from '../components/HomePage/';
import AboutPage from '../components/AboutPage';
import ArtworkPage from '../components/ArtworkPage';

import { initializeLibrary } from '../../utils/faLibrary';
import { updateFavicon, initSocks } from '../../utils/system';
import { cloudName } from '../../utils/cloudinaryApi';

import './scss/custom.scss';
import './scss/main.scss';


const App = () => {

  // set device sizes for Breakpoints
  initSocks();

  // set Favicon according to current env
  updateFavicon();

  // Initialize FontAwesome library
  initializeLibrary();


  return (
    <BreakpointProvider>
      <div className="page-container">
        <CloudinaryContext cloudName={cloudName}>
        <Router basename='/'>
          <Header />
          <div className="content-wrapper">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/connect">
                <ContactPage />
              </Route>
              <Route path="/artwork">
                <ArtworkPage />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer />
        </CloudinaryContext>
      </div>
    </BreakpointProvider>
  );
}

export default App;
