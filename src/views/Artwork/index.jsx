import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectLightboxUtil } from '../../utils/imageUtils';
import ThumbGallery from '../../components/ThumbGallery/';
import FilterNav from '../../components/FilterNav/alt';
import AlbumNav from '../../components/AlbumNav/';
import ImageDetail from '../../components/ImageDetail/';
import ProgressView from '../../components/ProgressView';
import { 
  fetchGallery, 
  sortGallery, 
  getContextProperty, 
  getThumbnailSize 
} from '../../utils/imageApi';
import { hasProgressSeries } from '../../utils/processUtils';

import './artwork.scss';


const ArtworkPage = props => {
  const [ navFilter, setNavFilter ] = useState(true);  // true = filter
  const [ currentIndex, setCurrentIndex ] = useState(0); // int
  const [ artImages, setArtImages ] = useState([]); // json array
  const [ refKey, setRefKey ] = useState(null); // string
  const [ selectedAlbum, setSelectedAlbum ] = useState(null); // nav obj
  const [ thumbSize, setThumbSize ] = useState(0);

  useEffect(() => {
    setRefKey(getContextProperty(artImages[currentIndex], 'key', null));
    return clearProgress;
  }, [artImages, currentIndex]);

  useEffect(() => {
    const size = getThumbnailSize(artImages.length);
    setThumbSize(size);
  }, [artImages]);

  useEffect(() => {
    clearArtGallery();
  }, [navFilter])

  const clearProgress = () => {
    setRefKey(null);
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
    setNavFilter(!navFilter);
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

      { navFilter ? (
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
          <Col xs={12} sm={6} md={3} lg={4}>
            <ThumbGallery 
              selectThumbnail={setCurrentIndex} 
              galleryImages={artImages}
              imageIndex={currentIndex}
              thumbSize={thumbSize}
              heading={selectedAlbum}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={5}>
            <ImageDetail 
              selectLightbox={props.selectLightbox}
              moveNext={moveNext}
              movePrevious={movePrev}
              imageList={artImages}
              imageIndex={currentIndex}
            />
          </Col>
          <Col xs={12} sm={8} md={3} lg={3} className="process">
            {hasProgressSeries(refKey) && (
              <ProgressView 
                selectLightbox={props.selectLightbox} 
                refKey={refKey} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

ArtworkPage.propTypes = {
  selectLightbox: PropTypes.func.isRequired
}
ArtworkPage.defaultProps = {
  selectLightbox: selectLightboxUtil
}

export default ArtworkPage;
