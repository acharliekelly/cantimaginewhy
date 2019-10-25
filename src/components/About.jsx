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
        <p>I'm going to put more information in this space, but I haven't got around to it yet.</p>
      </div>
      
    </div>
    

  </div>
);

export default AboutPage;
