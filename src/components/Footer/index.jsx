import React from 'react';
import EnvMode from '../EnvMode';

import './footer.scss';

const Footer = props => (
  <div className="footer">
    <span className="copyright">&copy;2020 by Charlie Kelly</span>
    <EnvMode type="icon" />
  </div>
);


export default Footer;
