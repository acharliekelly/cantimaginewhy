import React, { useState } from 'react';

import FilterNav from './FilterNav';
import FilteredGallery from './FilterGallery';
import GalleryCarousel from './GalleryCarousel';
// import ImageDisplay from './ImageDisplay';
import { fetchGallery } from '../utils/imageApi';

import '../css/artwork.scss';


export default function ArtworkPage() {
  const [ currentFilterIndex, setCurrentFilterIndex ] = useState(0);
  const [ currentAlbum, setCurrentAlbum ] = useState('');
  const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
  const [ imageList, setImageList ] = useState([]);

  const updateGallery = tagName => {
    console.log('Updating Gallery: ' + tagName);
    fetchGallery(tagName)
      .then(res => {
        setCurrentAlbum(tagName);
        setImageList(res.data.resources);
        setCurrentImageIndex(0);
      });
  }

  const clearGallery = () => {
    setCurrentFilterIndex(0);
    setCurrentAlbum(null);
    setCurrentImageIndex(0);
    setImageList([]);
  }

  return (
    <div className="content">
      <section className="left-colomn">
        <div className="page-info">
          <h2 className="page-title">Welcome to my artwork.</h2>
          <section className="page-desc">
          I've got a lot of pictures, and I had some trouble fitting them all into neat categories. 
          So, I've made some filters, to help you sort through them. Also, making the filters was fun 
          for me. So it's kind of a win-win.
          </section>
        </div>

        <FilterNav 
          filterIndex={currentFilterIndex}
          handleNavChange={updateGallery} 
          handleClearGallery={clearGallery} 
        />
        
        <FilteredGallery 
          currentAlbum={currentAlbum} 
          updateGallery={updateGallery} 
          imageList={imageList}
          updateImage={setCurrentImageIndex}
        />

      </section>

      <section className="right-colomn">
        <GalleryCarousel 
          pictures={imageList}
          currentIndex={currentImageIndex}
          updateImage={setCurrentImageIndex}
        />
        {/* <div className="image-box">
          <ImageDisplay currentImage={imageList[currentImageIndex]} />
        </div> */}
        
      </section>
      
      
    </div>
  )
}
