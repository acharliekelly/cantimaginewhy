import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import './css/main.css';

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

// because of temporary use of gh-pages
const makeUrl = path => {
  const host = window.location.hostname;
  if (host.includes('github.io')) {
    // using gh-pages, make relative path
    return '/cantimaginewhy' + path;
  } else {
    // otherwise using either localhost or cantimaginewhy.com
    return path;
  }
}

const App = () => {
  return (
    <Router>
      <Nav className="menu" activeKey="/home">
        <Nav.Item>
          <NavLink to={makeUrl('/home')}>Home</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={makeUrl('/about')}>About</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={makeUrl('/gallery')}>Gallery</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={makeUrl('/contact')}>Contact</NavLink>
        </Nav.Item>
      </Nav>
      <Route path="/home" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/gallery" component={Gallery} />
      
    </Router>
  );
}

export default App;
