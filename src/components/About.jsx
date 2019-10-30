import React from 'react';
import { Image } from 'cloudinary-react';

import '../css/About.scss';

const AboutPage = () => (
  <div className="content">
    <header>About</header>
    <div className="about-content">
      <Image className="me-photo" cloudName="cantimaginewhy" publicId="me/face-41" width="300"/>
      <div className="me-text">
        <p>Hi. My name is Charlie Kelly, and I do art stuff.</p>
        <p>I mostly do landscapes. Currently, I prefer doing them while standing directly in front of the scape.</p>
        
      </div>
    </div>
    <div className="about-content">
      <div className="me-text">
        <p>Here is a picture me doing that.</p>
      </div>
      <Image className="me-photo" cloudName="cantimaginewhy" publicId="me/caterpillar2" width="600" />
    </div>
    

  </div>
);

export default AboutPage;
