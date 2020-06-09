// import React, { useState } from 'react';
import React from 'react';
import { BreakpointProvider } from 'react-socks';
import { CloudinaryContext } from 'cloudinary-react';


import Header from './components/Header/';
import Footer from './components/Footer/';
// import DefaultRouter from './routers/DefaultRouter';
import PageRouter from './routers/PageRouter';

import { initializeLibrary } from './utils/faLibrary';
import { updateFavicon, initSocks } from './utils/system';
import { cloudName } from './utils/cloudinaryApi';

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
          <Header />
          <div className="content-wrapper">
            {/* set router type here */}
            <PageRouter />
          </div>
          <Footer />
        </CloudinaryContext>
      </div>
    </BreakpointProvider>
  );
}

export default App;
