import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import withSizes from 'react-sizes';
import { Breakpoint } from 'react-socks';
// import { mapSizesToProps } from '../../utils/system';
import { lookupGeo } from '../../utils/geoUtils';
import FilterNav from '../../components/Navs/FilterNav';
import AlbumNav from '../../components/Navs/AlbumNav';
import ImageDetail from '../../components/ImageDetail';
import Stacker from '../../components/Stacker';
import { sortGallery, getThumbnailSize } from '../../utils/imageApi';
import { fetchGallery, getContextProperty } from '../../utils/cloudinaryApi';

import './artwork.scss';


const INITIAL_NAV = false;  // true = filter

const ArtworkPage = props => {
  // STATE VARS
  const [ useFilter, setUseFilter ] = useState(INITIAL_NAV);  
  const [ selectedAlbum, setSelectedAlbum ] = useState(null); // tagob
  const [ thumbSize, setThumbSize ] = useState(0);
  const [ currentIndex, setCurrentIndex ] = useState(0); // int
  const [ artImages, setArtImages ] = useState([]); // json array
  const [ productLookup, setProductLookup ] = useState(null); // string
  const [ geotag, setGeotag ] = useState('');

  // switch nav
  useEffect(() => {
    clearArtGallery();
  }, [useFilter])

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

  // update gallery size
  useEffect(() => {
    const size = getThumbnailSize(artImages.length);
    setThumbSize(size);
  }, [artImages]);

  // run when no image is selected
  const clearImage = () => {
    setProductLookup(null);
    setGeotag('');
  }

  // METHODS
  const navSwitch = () => {
    setUseFilter(!useFilter);
  }

  const clearArtGallery = () => {
    setArtImages([]);
    setCurrentIndex(0);
    setProductLookup(null);
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

  const galleryMoves = {
    moveNext: moveNext,
    movePrevious: movePrev
  }


  const navProps = {
    updateSelectNav: selectGallery,
    updateClearGallery: clearArtGallery,
    updateNavSwitch: navSwitch
  }


  return (
    <div className="content">
      <Breakpoint lg up>
      { useFilter ? (
        <FilterNav {...navProps}/>
      ) : (
        <AlbumNav {...navProps}/>
      )}
      </Breakpoint>
      
      {selectedAlbum ? (
        <Container className="current-album">
          {!useFilter && selectedAlbum.description}
        </Container>
      ) : (
        <Container className="instructions">
          <p className="mr-1" style={{fontSize: '2vh', marginTop: '1vh'}}>
            Select a thumbnail from the gallery list to view the images.
          </p>
        </Container>
      )}


      <Breakpoint md down>
        <Container fluid="md">
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
      </Breakpoint>

      <Breakpoint lg up>
        <Container fluid>
          <Row>
            <Col lg={4}>
              <Stacker 
                tagObject={selectedAlbum} 
                selectThumbnail={setCurrentIndex} 
                galleryImages={artImages}
                imageIndex={currentIndex}
                isFullWidth={false}
                thumbSize={thumbSize}
                productLookup={productLookup}
                geoTag={geotag}
                maxHeight={70}
              />
            </Col>
            <Col lg={8}>
              <ImageDetail 
                imageMovement={galleryMoves}
                imageList={artImages}
                imageIndex={currentIndex}
                isFullWidth={false}
              />
            </Col>
          </Row>
        </Container>
      </Breakpoint>
      
    </div>
  )
}

export default ArtworkPage;
