import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import { ContactForm } from './components/Contact';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

// import Menu from './components/Menu';
import Home from './components/Home';
import AboutPage from './components/About';
import Gallery from './components/Gallery';

const ContactPage = () => (
  <div className="content">
    <header>Contact</header>
    <main>
      <ContactForm />
    </main>
  </div>
)

const ShopPage = () => (
  <div className="content">
    <header>Shop</header>
    <main className="todo">Put shopping stuff here</main>
  </div>
);

const App = () => {
  return (
    <div className="page-container">
      <Router basename='/'>
        <Nav className="menu justify-content-center" defaultActiveKey="/home">
          { /* 
          TODO: logo
          */}
          <Nav.Item>
            <NavLink to="/home">Home</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/artwork">Artwork</NavLink>
          </Nav.Item>
          {/* <Nav.Item>
            <NavLink to="/shop">Shop</NavLink>
          </Nav.Item> */}
          <Nav.Item>
            <NavLink to="/about">About</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/contact">Contact</NavLink>
          </Nav.Item>
          { /* 
          TODO: shopping cart, searchbar
          */}
        </Nav>
        <div className="content-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/artwork" component={Gallery} />
          <Route path="/shop" component={ShopPage} />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
