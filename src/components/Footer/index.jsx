import React from 'react';
import PropTypes from 'prop-types';
import EnvMode from '../EnvMode';

import './footer.scss';

const Footer = props => (
  <div className="footer">
    <span className="copyright">&copy;2020 by Charlie Kelly</span>
    <EnvMode type="icon" devMode={props.devMode} />
  </div>
);

Footer.propTypes = {
  devMode: PropTypes.func
}

export default Footer;
