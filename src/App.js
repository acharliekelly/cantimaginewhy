import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Image } from 'cloudinary-react';

import { ContactForm } from './components/Contact';
import Footer from './components/Footer';

import './css/main.scss';

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
    <React.Fragment>
      <CssBaseline />
      <div className="page-container">
        <Router basename='/'>
          <nav className="menu justify-content-center" defaultActiveKey="/home">
            <Image cloudName="cantimaginewhy" publicId="ck_logo" />
            <div className="nav-item">
              <NavLink to="/home">Home</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/artwork">Artwork</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/shop">Shop</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/about">About</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/contact">Contact</NavLink>
            </div>
            { /* 
            TODO: shopping cart, searchbar
            */}
          </nav>
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
    </React.Fragment>
  );
}

export default App;
