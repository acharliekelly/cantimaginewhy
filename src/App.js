import React from 'react';
import { 
  HashRouter as Router, 
  Route,
  Switch,
  useParams
} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import Menu from './components/Menu/';
import { ContactForm, OrderForm } from './components/Contact/';
import Footer from './components/Footer/';
import Home from './components/Home/';
import AboutPage from './components/About/';
import FilteredGallery from './components/FilteredGallery/';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';



const ContactPage = () => (
  <div className="content">
    
    <main>
      <ContactForm />
    </main>
  </div>
)

const OrderPage = () => {
  let { id } = useParams();
  return (
    <div className="content">
      <main>
        <OrderForm imageId={id} />
      </main>
    </div>
  )
}


const App = () => {
  library.add(fab, faChevronCircleLeft, faChevronCircleRight);
  return (
    <div className="page-container">
      <Router basename='/'>
        <Menu />
        <div className="content-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Switch>
            <Route exact path="/order">
              <ContactPage />
            </Route>
            <Route path="/order/:id" children={<OrderPage />} />
          </Switch>
          <Route path="/artwork" component={FilteredGallery} />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
