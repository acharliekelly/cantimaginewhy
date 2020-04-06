// import React, { useState } from 'react';
import React from 'react';
import { 
  HashRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';  

import Header from './components/Header';
import ContactPage from './views/Contact/';
import Footer from './components/Footer/';
import HomePage from './views/Home/';
import AboutPage from './views/About/';
import ArtworkPage from './views/Artwork';

import { initializeLibrary } from './utils/faLibrary';
import { updateFavicon } from './utils/system';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';


const App = () => {

  // set Favicon according to current env
  updateFavicon();

  // Initialize FontAwesome library
  initializeLibrary();


  return (
    <div className="page-container">
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
    </div>
  );
}

export default App;
