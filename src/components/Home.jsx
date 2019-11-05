import React from 'react';

import ImageCarousel from './ImageCarousel';
import '../css/home.scss';

export default function Home() {
  
   return (
      <div className="content">
        <main>
          <h1>Can't Imagine Why</h1>
          <ImageCarousel tagName="panorama" />
          
        </main>
      </div>
    );
}

