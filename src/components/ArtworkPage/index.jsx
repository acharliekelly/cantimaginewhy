import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breakpoint } from 'react-socks';

import FilterNav from 'Containers/FilterNav';
import AlbumNav from 'ContainersAlbumNav';
import ImageDetail from 'Containers/ImageDetail';
import Stacker from 'Containers/Stacker';

import './artwork.scss';


const ArtworkPage = props => {
  const { isFilter, selectedGallery } = props;

  return (
    <div className="content">
      <Breakpoint lg up>
      { isFilter ? (
        <FilterNav />
      ) : (
        <AlbumNav />
      )}
      </Breakpoint>
      
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


      <Breakpoint md down>
        <Container fluid="md">
          <ImageDetail />
          <Stacker maxHeight={70} />
        </Container>
      </Breakpoint>

      <Breakpoint lg up>
        <Container fluid>
          <Row>
            <Col lg={4}>
              <Stacker 
                isFullWidth={false}
                maxHeight={70}
              />
            </Col>
            <Col lg={8}>
              <ImageDetail isFullWidth={false} />
            </Col>
          </Row>
        </Container>
      </Breakpoint>
      
    </div>
  )
}

export default ArtworkPage;
