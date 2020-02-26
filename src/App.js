import React from 'react';
import { 
  HashRouter as Router, 
  Route
} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import Menu from './components/Menu/';
import ContactPage from './views/Contact/';
import Footer from './components/Footer/';
import HomePage from './views/Home/';
import AboutPage from './views/About/';
import ArtworkPage from './views/Artwork';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';





const App = () => {
  library.add(fab, faChevronCircleLeft, faChevronCircleRight);
  return (
    <div className="page-container">
      <Router basename='/'>
        <Menu />
        <div className="content-wrapper">
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/artwork" component={ArtworkPage} />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
