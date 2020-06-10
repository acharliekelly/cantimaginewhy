import React from 'react';
import { Router, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// import ContactPage from '../views/Contact';
// import HomePage from '../views/Home';
// import AboutPage from '../views/About';
// import ArtworkPage from '../views/Artwork';

import '../scss/fade.scss';

export const FadeRouter = () => (
  <FadeTransitionRouter>
    <Page path="/" page="1" />
    <Page path="page/:page" />
  </FadeTransitionRouter>
)

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Router location={location} className="router">
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

const Page = props => (
  <div 
    className="page"
    style={{ background: `hsl(${props.page * 75}, 60%, 60%)`}}
  >
    {props.page}
  </div>
);