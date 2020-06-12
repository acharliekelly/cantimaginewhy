import React from 'react';
import { Router } from '@reach/router';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../utils/system';
import ArtworkPage from '../pages/Artwork';
import MobilePage from '../pages/Mobile';

const ArtRouter = props => (
  <Router>
    {props.isDesktop ? (
      <ArtworkPage path="/*" />
    ) : (
      <MobilePage path="/*" />
    )}
  </Router>
)

export default withSizes(mapSizesToProps)(ArtRouter);