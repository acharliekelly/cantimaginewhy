import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { albums, navDescription } from '../../config/albums';
import HelpButton from '../Buttons/HelpButton/';

import '../../css/nav.scss';

const AlbumNav = props => {
  const [ selectedNav, setSelectedNav ] = useState(null);

  const selectItem = navObj => {
    setSelectedNav(navObj);
    props.updateSelectNav(navObj);
  }

  return (
      <CloudinaryContext cloudName="cantimaginewhy">
         <Navbar className="category-bar justify-content-between">

          <Button className="nav-switch" variant="outline-dark" onClick={props.updateSwitch}>
            <FontAwesomeIcon icon="filter" title="Browse by Filter" size="2x" />
          </Button>

          <Navbar.Text>
            <span className="browse-title">Browse by Album</span>
          </Navbar.Text>
              
          <HelpButton header="Albums" content={navDescription} size="2x" />
        
        </Navbar>

        <Container fluid expand="lg" className="album-bar justify-content-center">
          <ul className="albums">
            {albums.map((album, index) => {
              let cls = 'album-btn responsive thumbnail';
              if (selectedNav && selectedNav.tag === album.tag) {
                cls += ' selected-nav'
              }
              return (
                <li 
                  key={index} 
                  id={album.tag} 
                  className={cls} 
                  onClick={() => selectItem(album)}
                >
                  <Image publicId={`${album.thumbnail}`}>
                    <Transformation defaultImage={defaultImg} />
                    <Transformation 
                      height={props.thumbnailHeight} 
                      width={props.thumbnailHeight} 
                      crop="fill" />   
                  </Image>
                  <div className="album-name">{album.name}</div>
                </li>
              );
            })}
          </ul>
        </Container>
      </CloudinaryContext>
    );
        
}

AlbumNav.propTypes = {
  updateSelectNav: PropTypes.func.isRequired,
  updateClearGallery: PropTypes.func.isRequired,
  updateSwitch: PropTypes.func.isRequired,
  thumbnailHeight: PropTypes.number
};

AlbumNav.defaultProps = {
  thumbnailHeight: 80
}

export default AlbumNav;
