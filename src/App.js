import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';

import './App.css';
import './css/main.css';

// import Menu from './components/Menu';
import Home from './components/Home';
import AboutPage from './components/About';
import Gallery from './components/Gallery';

const ContactPage = () => (
  <div>
    <header>Contact</header>
    <main className="todo">Coming Soon</main>
  </div>
);

const App = () => {
  return (
    <Router>
      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        
      </nav>
      <div className="content">
        <Route path="/home" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/gallery" component={Gallery} />
      </div>
      
    </Router>
  );
}

export default App;
