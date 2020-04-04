import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectLightboxUtil } from '../../utils/imageUtils';
import FilterNav from '../../components/FilterNav';
import AlbumNav from '../../components/AlbumNav/';
import ImageDetail from '../../components/ImageDetail/';
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
  const [ useFilter, setUseFilter ] = useState(INITIAL_NAV);  
  const [ selectedAlbum, setSelectedAlbum ] = useState(null); // tagob
  const [ thumbSize, setThumbSize ] = useState(0);
  const [ currentIndex, setCurrentIndex ] = useState(0); // int
  const [ artImages, setArtImages ] = useState([]); // json array
  const [ refKey, setRefKey ] = useState(null); // string
  const [ geotag, setGeotag ] = useState('')
  
  const { navFilter, album, filter } = props;

  useEffect(() => {
    if (album)
      setSelectedAlbum(album);
  }, [album])

  useEffect(() => {
    if (filter)
      setSelectedAlbum(filter);
  }, [filter])

  useEffect(() => {
    setUseFilter(navFilter);
  }, [navFilter])

  useEffect(() => {
    clearArtGallery();
  }, [useFilter])

  useEffect(() => {
    const img = artImages[currentIndex];
    if (img) {
      setRefKey(getContextProperty(img, 'key', null));
      setGeotag(getContextProperty(img, 'geotag', ''));
    }
    return clearImage;
  }, [artImages, currentIndex]);

  useEffect(() => {
    const size = getThumbnailSize(artImages.length);
    setThumbSize(size);
  }, [artImages]);

  // run when no image is selected
  const clearImage = () => {
    setRefKey(null);
    setGeotag('');
  }

  const clearArtGallery = () => {
    setArtImages([]);
    setCurrentIndex(0);
    setRefKey(null);
    setSelectedAlbum(null);
  }  

  const selectGallery = nav => {
    fetchGallery(nav.tag).then(resources => {
      const sorted = sortGallery(nav, resources);
      setArtImages(sorted);
      setCurrentIndex(0);
      setSelectedAlbum(nav);
    }).catch(err => console.error(err))
  }
  
  const switchNavType = () => {
    setUseFilter(!useFilter);
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
          updateSwitch={switchNavType}
          />
      ) : (
        <AlbumNav
          updateSelectNav={selectGallery}
          updateClearGallery={clearArtGallery}
          updateSwitch={switchNavType}
        />
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

ArtworkPage.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  navFilter: PropTypes.bool,
  filter: PropTypes.string,
  album: PropTypes.string
}
ArtworkPage.defaultProps = {
  selectLightbox: selectLightboxUtil,
  navFilter: false
}

export default ArtworkPage;
