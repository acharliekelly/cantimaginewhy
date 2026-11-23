import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Image, Transformation } from 'cloudinary-react';
import { albums } from '../../config/albums';
// import withSizes from 'react-sizes';
import { Breakpoint } from 'react-socks';
// import { mapSizesToProps } from '../../utils/system';
import { lookupGeo } from '../../utils/geoUtils';
import FilterNav from '../../components/Navs/FilterNav';
import AlbumNav from '../../components/Navs/AlbumNav';
import ImageDetail from '../../components/ImageDetail';
import Stacker from '../../components/Stacker';
import { sortGallery, getThumbnailSize } from '../../utils/imageApi';
import { defaultImg, fetchGallery, getContextProperty } from '../../utils/cloudinaryApi';

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

  const [galleryStatus, setGalleryStatus] = useState(null);
  const latestRequest = useRef(0);

  useEffect(() => () => {
    latestRequest.current += 1;
  }, []);

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
    clearArtGallery();
    setUseFilter(!useFilter);
  }

  const clearArtGallery = () => {
    latestRequest.current += 1;
    setGalleryStatus(null);
    setArtImages([]);
    setCurrentIndex(0);
    setProductLookup(null);
    setSelectedAlbum(null);
  }  

  const selectGallery = async nav => {
    const request = ++latestRequest.current;
    setGalleryStatus({ loading: true, name: nav.name });

    try {
      const resources = await fetchGallery(nav.tag);
      if (request !== latestRequest.current) return;

      setArtImages(sortGallery(nav, resources));
      setCurrentIndex(0);
      setSelectedAlbum(nav);
      setGalleryStatus(null);
    } catch (error) {
      if (request !== latestRequest.current) return;

      setGalleryStatus({ loading: false, name: nav.name });
    }
  };

  const galleryFeedback = galleryStatus && (
    galleryStatus.loading ? (
      <p role="status">Loading {galleryStatus.name}…</p>
    ) : (
      <p role="alert">Could not load {galleryStatus.name}. Select it again to retry.</p>
    )
  );

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


  if (!useFilter && !selectedAlbum) {
    return (
      <main className="content">
        <Container className="album-overview py-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
            <h1 className="mb-0">Artwork</h1>
            <Breakpoint lg up>
              <Button variant="outline-dark" onClick={navSwitch}>Browse by filter</Button>
            </Breakpoint>
          </div>
          {galleryFeedback}
          <Row xs={2} md={3} lg={4}>
            {albums.map(album => (
              <Col key={album.tag} className="mb-3">
                <Button
                  variant="outline-dark"
                  className="album-cover w-100 h-100 p-2 text-left"
                  onClick={() => selectGallery(album)}
                >
                  <Image publicId={album.thumbnail} alt="" className="album-cover-image">
                    <Transformation width={480} height={320} crop="fill" gravity="auto" />
                    <Transformation defaultImage={defaultImg} />
                  </Image>
                  <strong className="d-block mt-2">{album.name}</strong>
                  <span className="d-block">{album.description}</span>
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    );
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
      
      <Container className="my-2">
        {!useFilter && (
          <Button variant="outline-dark" onClick={clearArtGallery}>All albums</Button>
        )}
        {galleryFeedback}
        {selectedAlbum && !galleryStatus && artImages.length === 0 && (
          <p role="status">No artwork found in {selectedAlbum.name}.</p>
        )}
      </Container>

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
