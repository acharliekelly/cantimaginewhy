import React from 'react';
import ImageCarousel from './ImageCarousel';

const clickImage = img => {
  console.log('image clicked: ', img)
} 

export default function Home() {
  
   return (
      <div className="content">
        <main>
          <header>Can't Imagine Why</header>
          <ImageCarousel tagName="favorite" selectImage={clickImage} />
        </main>
      </div>
    );
}

