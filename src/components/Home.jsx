import React from 'react';

import ImageCarousel from './ImageCarousel-cover';
import '../css/Home.scss';

export default function Home() {
  
   return (
      <div className="content">
        <div className="site-title">Can't Imagine Why</div>
        <main>
          <ImageCarousel tagName="favorite" />
          
        </main>
      </div>
    );
}

