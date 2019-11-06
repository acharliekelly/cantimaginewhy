import React from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';

const Footer = () => (
  <div className="footer">
    <span className="copyright">&copy;2019 by Charlie Kelly</span>
    <span className="social">
      <CloudinaryContext cloudName="cantimaginewhy">
        <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/cant_imagine_why">
          <Image publicId="icon/instagram_logo" height="100" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/acharliekelly">
          <Image publicId="icon/facebook_logo" height="100" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/acharliekelly">
          <Image publicId="icon/github_logo" height="100" />
        </a>
      </CloudinaryContext>
    </span>
  </div>
);

export default Footer;
