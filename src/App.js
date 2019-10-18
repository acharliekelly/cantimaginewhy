import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import './css/main.scss';

// import Menu from './components/Menu';
import Home from './components/Home';
import AboutPage from './components/About';
import Gallery from './components/Gallery';

const ContactPage = () => (
  <div className="content">
    <header>Contact</header>
    <main className="lorem">Coming Soon</main>
  </div>
);

const App = () => {
  return (
    <Router basename='/'>
      <Nav className="menu">
        <Nav.Item>
          <NavLink className="homelink" to="/">Home</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/about">About</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/gallery">Gallery</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/contact">Contact</NavLink>
        </Nav.Item>
      </Nav>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/gallery" component={Gallery} />
      
    </Router>
  );
}

export default App;
