import React from 'react';
import { 
  HashRouter as Router, 
  Route
} from 'react-router-dom';

import Menu from './components/Menu';
// import { ContactForm } from './components/Contact';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

import Home from './components/Home';
import AboutPage from './components/About';
import FilteredGallery from './components/FilteredGallery';

const ContactPage = () => (
  <div className="content">
    <header>Contact</header>
    <main>
      <h2>I don't quite have my contact form working yet, so for now, please just send me an 
        {' '}<a href="mailto:cant.imagine.why00@gmail.com">email</a>.</h2>
    </main>
  </div>
)


const App = () => {
  return (
    <div className="page-container">
      <Router basename='/'>
        <Menu />
        <div className="content-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/artwork" component={FilteredGallery} />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
