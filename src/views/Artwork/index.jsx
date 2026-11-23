import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, matchPath, useHistory, useLocation } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import { albums } from '../../config/albums';
import { lookupGeo } from '../../utils/geoUtils';
import FilterNav from '../../components/Navs/FilterNav';
import AlbumNav from '../../components/Navs/AlbumNav';
import ImageDetail from '../../components/ImageDetail';
import Stacker from '../../components/Stacker';
import { sortGallery, getThumbnailSize } from '../../utils/imageApi';
import { defaultImg, fetchGallery, getContextProperty } from '../../utils/cloudinaryApi';

import './artwork.scss';


const OVERVIEW_PATH = '/artwork';
const FILTER_PATH = '/artwork/filter';
const albumPath = album => `${OVERVIEW_PATH}/album/${album.tag}`;
const EMPTY_IMAGES = [];

const ArtworkPage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const overview = matchPath(pathname, { path: OVERVIEW_PATH, exact: true });
  const useFilter = Boolean(matchPath(pathname, { path: FILTER_PATH, exact: true }));
  const albumMatch = matchPath(pathname, { path: `${OVERVIEW_PATH}/album/:tag`, exact: true });
  const album = albums.find(item => item.tag === albumMatch?.params.tag);

  const [filterChoice, setFilterChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedAlbum = useFilter ? filterChoice : album;
  const currentResult = result && result.album === selectedAlbum && result.attempt === attempt ? result : null;
  const artImages = currentResult?.images || EMPTY_IMAGES;
  const currentImage = artImages[currentIndex];
  const thumbSize = getThumbnailSize(artImages.length);
  const productLookup = getContextProperty(currentImage, 'key', null);
  const geotag = currentImage
    ? getContextProperty(currentImage, 'geotag', '') || lookupGeo(currentImage.public_id)
    : '';

  useEffect(() => {
    if (!useFilter) setFilterChoice(null);
  }, [useFilter]);

  useEffect(() => {
    setCurrentIndex(0);
    setResult(null);
    if (!selectedAlbum) return;

    let active = true;
    fetchGallery(selectedAlbum.tag)
      .then(resources => {
        if (active) setResult({ album: selectedAlbum, attempt, images: sortGallery(selectedAlbum, resources) });
      })
      .catch(() => {
        if (active) setResult({ album: selectedAlbum, attempt, failed: true });
      });

    return () => { active = false; };
  }, [selectedAlbum, attempt]);

  const navSwitch = () => {
    history.push(useFilter ? OVERVIEW_PATH : FILTER_PATH);
  };

  const galleryFeedback = selectedAlbum && (
    <>
      {!currentResult && <p role="status">Loading {selectedAlbum.name}…</p>}
      {currentResult?.failed && (
        <>
          <p role="alert">Could not load {selectedAlbum.name}.</p>
          <Button variant="outline-dark" onClick={() => setAttempt(count => count + 1)}>Retry</Button>
        </>
      )}
      {currentResult?.images?.length === 0 && (
        <p role="status">No artwork found in {selectedAlbum.name}.</p>
      )}
    </>
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


  if (!overview && !useFilter && !album) {
    return (
      <main className="content">
        <Container className="py-4">
          <h1>Album not found</h1>
          <Button as={Link} to={OVERVIEW_PATH} variant="outline-dark">All albums</Button>
        </Container>
      </main>
    );
  }

  if (overview) {
    return (
      <main className="content">
        <Container className="album-overview py-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
            <h1 className="mb-0">Artwork</h1>
            <Button as={Link} to={FILTER_PATH} variant="outline-dark">Browse by filter</Button>
          </div>
          <Row xs={2} md={3} lg={4}>
            {albums.map(album => (
              <Col key={album.tag} className="mb-3">
                <Button
                  variant="outline-dark"
                  className="album-cover w-100 h-100 p-2 text-left"
                  as={Link}
                  to={albumPath(album)}
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
    <div className="content artwork-gallery">
      {useFilter ? (
        <FilterNav
          updateSelectNav={choice => {
            if (choice === filterChoice && currentResult?.failed) {
              setAttempt(count => count + 1);
            }
            setFilterChoice(choice);
          }}
          updateClearGallery={() => setFilterChoice(null)}
          updateNavSwitch={navSwitch}
        />
      ) : (
        <AlbumNav albumPath={albumPath} selectedTag={album.tag} updateNavSwitch={navSwitch} />
      )}
      
      <Container className="my-2">
        {!useFilter && (
          <Button as={Link} to={OVERVIEW_PATH} variant="outline-dark">All albums</Button>
        )}
        {galleryFeedback}
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


      <Container fluid>
        <Row>
          <Col xs={12} lg={{ span: 8, order: 2 }}>
            <ImageDetail
              imageMovement={galleryMoves}
              imageList={artImages}
              imageIndex={currentIndex}
              tagObject={selectedAlbum}
            />
          </Col>
          <Col xs={12} lg={{ span: 4, order: 1 }}>
            <Stacker
              tagObject={selectedAlbum}
              selectThumbnail={setCurrentIndex}
              galleryImages={artImages}
              imageIndex={currentIndex}
              thumbSize={thumbSize}
              productLookup={productLookup}
              geoTag={geotag}
              maxHeight={70}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ArtworkPage;
