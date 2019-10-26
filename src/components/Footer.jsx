import React from 'react';
import { Image } from 'cloudinary-react';

const Footer = () => (
  <div className="footer">
    <span className="copyright">&copy;2019 by Charlie Kelly</span>
    <span className="social">
      <Image cloudName="cantimaginewhy" publicId="instagram_logo" height="100" />
      <a target="_blank" rel=" noopener noreferrer" href="https://instagram.com/cant_imagine_why">
        @cant_imagine_why
      </a>
    </span>
  </div>
);

export default Footer;
