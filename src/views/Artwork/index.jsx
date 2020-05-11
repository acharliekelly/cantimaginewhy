import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breakpoint } from 'react-socks';
import { lookupGeo } from '../../utils/geoUtils';
import FilterNav from '../../components/Navs/FilterNav';
import AlbumNav from '../../components/Navs/AlbumNav';
import ImageDetail from '../../components/ImageDetail';
import Stacker from '../../components/Stacker';
import { sortGallery, getThumbnailSize } from '../../utils/imageApi';
import { fetchGallery, getContextProperty } from '../../utils/cloudinaryApi';
import { ImgGallery } from '../../utils/gallery';

import './artwork.scss';


const INITIAL_NAV = false;  // true = filter

const ArtworkPage = props => {
  const tmp = new ImgGallery([])
  // STATE VARS
  const [ useFilter, setUseFilter ] = useState(INITIAL_NAV);  
  const [ selectedAlbum, setSelectedAlbum ] = useState(null); // tagob
  const [ thumbSize, setThumbSize ] = useState(0);
  const [ imgGallery, setImgGallery ] = useState(tmp);
  // const [ currentIndex, setCurrentIndex ] = useState(0); // int
  // const [ artImages, setArtImages ] = useState([]); // json array
  const [ refKey, setRefKey ] = useState(null); // string
  const [ geotag, setGeotag ] = useState('');

  // switch nav
  useEffect(() => {
    clearArtGallery();
  }, [useFilter])

  // update display image
  useEffect(() => {
    if (imgGallery && imgGallery.hasImages) {
      const img = imgGallery.currentImage
      if (img) {
        setRefKey(getContextProperty(img, 'key', null));
        // look in both image context and data file 
        const geo = (getContextProperty(img, 'geotag', '') || lookupGeo(img.public_id))
        setGeotag(geo);
      }
      const size = getThumbnailSize(imgGallery.imageList.length);
      setThumbSize(size);
    }
    return clearImage;
  }, [imgGallery]);

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
    setImgGallery(null);
    setRefKey(null);
    setSelectedAlbum(null);
  }  

  // takes tagob
  const selectGallery = nav => {
    fetchGallery(nav.tag).then(resources => {
      const sorted = sortGallery(nav, resources);
      setImgGallery(new ImgGallery(sorted));
      setSelectedAlbum(nav);
    }).catch(err => console.error(err))
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
      
      {!selectedAlbum && (
        <Container className="instructions">
          <p className="mr-1" style={{fontSize: '2vh', marginTop: '1vh'}}>
            Select a thumbnail from the gallery list to view the images.
          </p>
        </Container>
      )}


      <Breakpoint md down>
        <Container fluid="md">
          <ImageDetail 
            imgGallery={imgGallery}
            isFullWidth={true}
          />
          <Stacker 
            updateSelectNav={selectGallery}
            tagObject={selectedAlbum} 
            selectThumbnail={imgGallery.setIndex} 
            galleryImages={imgGallery.imageList}
            imageIndex={imgGallery.index}
            isFullWidth={true}
            refKey={refKey}
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
                selectThumbnail={imgGallery.setIndex} 
                galleryImages={imgGallery.imageList}
                imageIndex={imgGallery.index}
                isFullWidth={false}
                thumbSize={thumbSize}
                refKey={refKey}
                geoTag={geotag}
                maxHeight={70}
              />
            </Col>
            <Col lg={8}>
              <ImageDetail 
                imgGallery={imgGallery}
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
