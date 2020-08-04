import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FilterNav from 'Containers/FilterNav';
import AlbumNav from 'ContainersAlbumNav';
import ImageDetail from 'Containers/ImageDetail';
import GalleryStack from 'Containers/GalleryStack';
import ImageStack from 'Containers/ImageStack';

import './artwork.scss';


const ArtworkPage = props => {
  const { isFilter, selectedGallery } = props;

  return (
    <div className="content">
      { isFilter ? (
        <FilterNav />
      ) : (
        <AlbumNav />
      )}
      
      {selectedGallery ? (
        <Container className="current-album">
          {!isFilter && selectedGallery.description}
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
          <Col md={4} sm={12}>
            <GalleryStack maxHeight={70} />
          </Col>
          <Col md={4} sm={12}>
            <ImageDetail />
          </Col>
          <Col md={4} sm={12}>
            <ImageStack maxHeight={70} />
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default ArtworkPage;
