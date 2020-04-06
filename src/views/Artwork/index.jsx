import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { lookupGeo } from '../../utils/geoUtils';
import FilterNav from '../../components/Navs/FilterNav';
import AlbumNav from '../../components/Navs/AlbumNav';
import ImageDetail from '../../components/ImageDetail';
import Stacker from '../../components/Stacker';
import { 
  fetchGallery, 
  sortGallery, 
  getContextProperty, 
  getThumbnailSize 
} from '../../utils/imageApi';

import './artwork.scss';


const INITIAL_NAV = false;  // true = filter

const ArtworkPage = props => {
  // STATE VARS
  const [ useFilter, setUseFilter ] = useState(INITIAL_NAV);  
  const [ selectedAlbum, setSelectedAlbum ] = useState(null); // tagob
  const [ thumbSize, setThumbSize ] = useState(0);
  const [ currentIndex, setCurrentIndex ] = useState(0); // int
  const [ artImages, setArtImages ] = useState([]); // json array
  const [ refKey, setRefKey ] = useState(null); // string
  const [ geotag, setGeotag ] = useState('');
  


  // switch nav
  useEffect(() => {
    clearArtGallery();
  }, [useFilter])

  // update display image
  useEffect(() => {
    const img = artImages[currentIndex];
    if (img) {
      setRefKey(getContextProperty(img, 'key', null));
      // look in both image context and data file 
      const geo = (getContextProperty(img, 'geotag', '') || lookupGeo(img.public_id))
      setGeotag(geo);
    }
    return clearImage;
  }, [artImages, currentIndex]);

  // update gallery size
  useEffect(() => {
    const size = getThumbnailSize(artImages.length);
    setThumbSize(size);
  }, [artImages]);

  // run when no image is selected
  const clearImage = () => {
    setRefKey(null);
    setGeotag('');
  }

  // METHODS
  const navSwitch = () => {
    setUseFilter(!useFilter);
  }

  const clearArtGallery = () => {
    setArtImages([]);
    setCurrentIndex(0);
    setRefKey(null);
    setSelectedAlbum(null);
  }  

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


  return (
    <div className="content">
      
      { useFilter ? (
        <FilterNav 
          updateSelectNav={selectGallery} 
          updateClearGallery={clearArtGallery} 
          updateNavSwitch={navSwitch}
          />
      ) : (
        <AlbumNav
          updateSelectNav={selectGallery}
          updateClearGallery={clearArtGallery}
          updateNavSwitch={navSwitch}
        />
      )}

      {!selectedAlbum && (
        <Container className="instructions">
          <p>Select a thumbnail from the gallery list to view the images.</p>
        </Container>
      )}
      
      <Container style={{width: '100%'}}>
        <Row>
          <Col xs={12} sm={4}>
            <Stacker 
              tagObject={selectedAlbum} 
              selectThumbnail={setCurrentIndex} 
              galleryImages={artImages}
              imageIndex={currentIndex}
              thumbSize={thumbSize}
              refKey={refKey}
              geoTag={geotag}
              maxHeight={60}
              {...props}
            />
          </Col>
          <Col xs={12} sm={8}>
            <ImageDetail 
              moveNext={moveNext}
              movePrevious={movePrev}
              imageList={artImages}
              imageIndex={currentIndex}
              {...props}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ArtworkPage;
