import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { lookupGeo } from '../utils/geoUtils';
import ImageDetail from '../components/ImageDetail';
import Stacker from '../components/Stacker';
import { sortGallery } from '../utils/imageApi';
import { fetchGallery, getContextProperty } from '../utils/cloudinaryApi';

import './artwork.scss';

const MobilePage = props => {
  // STATE VARS
  const [ selectedAlbum, setSelectedAlbum ] = useState(null); // tagob
  const [ currentIndex, setCurrentIndex ] = useState(0); // int
  const [ artImages, setArtImages ] = useState([]); // json array
  const [ productLookup, setProductLookup ] = useState(null); // string
  const [ geotag, setGeotag ] = useState('');

  // update display image
  useEffect(() => {
    const img = artImages[currentIndex];
    if (img) {
      setProductLookup(getContextProperty(img, 'key', null));
      // look in both image context and data file 
      const geo = (getContextProperty(img, 'geotag', '') || lookupGeo(img.public_id))
      setGeotag(geo);
    }
    return clearImage;
  }, [artImages, currentIndex]);

  // run when no image is selected
  const clearImage = () => {
    setProductLookup(null);
    setGeotag('');
  }

  // METHODS

  // takes tagob
  const selectGallery = nav => {
    fetchGallery(nav.tag).then(resources => {
      const sorted = sortGallery(nav, resources);
      setArtImages(sorted);
      setCurrentIndex(0);
      setSelectedAlbum(nav);
    }).catch(err => console.error(err))
  }

  const moveNext = () => {
    const next = (currentIndex + 1) % artImages.length;
    setCurrentIndex(next)
  }

  const movePrev = () => {
    const prev = (currentIndex + artImages.length - 1) % artImages.length;
    setCurrentIndex(prev)
  }

  const galleryMoves = {
    moveNext: moveNext,
    movePrevious: movePrev
  }

  return (
    <div className="content">
      
      {selectedAlbum ? (
        <Container className="current-album">
          {selectedAlbum.description}
        </Container>
      ) : (
        <Container className="instructions">
          <p className="mr-1" style={{fontSize: '2vh', marginTop: '1vh'}}>
            Select a thumbnail from the gallery list to view the images.
          </p>
        </Container>
      )}

      <Container>
        <ImageDetail 
          imageMovement={galleryMoves}
          imageList={artImages}
          imageIndex={currentIndex}
          isFullWidth={true}
          tagObject={selectedAlbum}
        />
        <Stacker 
          updateSelectNav={selectGallery}
          tagObject={selectedAlbum} 
          selectThumbnail={setCurrentIndex} 
          galleryImages={artImages}
          imageIndex={currentIndex}
          isFullWidth={true}
          productLookup={productLookup}
          geoTag={geotag}
          maxHeight={70}
        />
      </Container>

    </div>
  )

}

export default MobilePage;