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
    <main className="todo">Put contact form here</main>
  </div>
);

const ShopPage = () => (
  <div className="content">
    <header>Shop</header>
    <main className="todo">Some shopping stuff</main>
  </div>
);

const App = () => {
  return (
    <div className="page-container">
      <Router basename='/'>
        <Nav className="menu">
          <Nav.Item>
            <NavLink className="homelink" to="/">Home</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/artwork">Artwork</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/shop">Shop</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/about">About</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/contact">Contact</NavLink>
          </Nav.Item>
        </Nav>
        <div className="content-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/artwork" component={Gallery} />
          <Route path="/shop" component={ShopPage} />
        </div>
      </Router>
      <div className="footer">
        <span className="copyright">&copy;2019 by Charlie Kelly</span>
      </div>
    </div>
  );
}

export default App;
