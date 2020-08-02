// import React, { useState } from 'react';
import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';  
import { BreakpointProvider } from 'react-socks';
import { CloudinaryContext } from 'cloudinary-react';

import Header from 'Comps/Header';
import ContactPage from 'Containers/ContactPage/';
import Footer from 'Comps/Footer/';
import HomePage from 'Comps/HomePage/';
import AboutPage from 'Containers/AboutPage';
import ArtworkPage from 'Containers/ArtworkPage';

import { initializeLibrary } from 'Utils/faLibrary';
import { updateFavicon, initSocks } from 'Utils/system';
import { cloudName } from 'Api/cloudinaryApi';

import 'Styles/custom.scss';
import 'Styles/main.scss';


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
