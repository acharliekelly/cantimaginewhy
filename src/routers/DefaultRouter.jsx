import React from 'react';
import { 
  HashRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';

import Header from '../components/Header';
import ContactPage from '../views/Contact';
import HomePage from '../views/Home';
import AboutPage from '../views/About';
import ArtworkPage from '../views/Artwork';

/**
 * This is the original router, extracted from App.js
 */
export default () => (
  <Router basename='/'>
    <Header />
    <div className="content-wrapper">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/connect" component={ContactPage} />
        <Route path="/artwork" component={ArtworkPage} />
      </Switch>
    </div>
  </Router>
);