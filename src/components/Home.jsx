import React from 'react';

import ImageCarousel from './ImageCarousel';
import '../css/home.scss';

export default function Home() {
  
   return (
      <div className="content">
        <div className="site-title">Can't Imagine Why</div>
        <main>
          <ImageCarousel tagName="panorama" />
          
        </main>
      </div>
    );
}

