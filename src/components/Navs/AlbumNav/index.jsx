import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavButton from '../NavButton';
import { albums, navDescription } from '../../../config/albums';
import HelpButton from '../../Buttons/HelpButton/';
import NavSwitch from '../NavSwitch';
import classNames from 'classnames';

import '../nav.scss';

const AlbumNav = props => {
  
  const navBtnCls = classNames('album-bar', 'justify-content-center', 'albums');

  return (
      <React.Fragment>
        <Navbar className="justify-content-between">
          <NavSwitch navType="album" {...props} />
          <Navbar.Text>
            <span className="browse-title">Browse by Album</span>
          </Navbar.Text>
          <HelpButton header="Albums" content={navDescription} size="2x" />
        </Navbar>

        <Container fluid="md" className={navBtnCls}>
        {albums.filter(album => album.display).map((album, index) => (
          <NavButton key={index} navTag={album} {...props} />
        ))}
        </Container>
      </React.Fragment>
    );
        
}

AlbumNav.propTypes = {
  updateSelectNav: PropTypes.func,
  updateClearGallery: PropTypes.func,
  thumbnailHeight: PropTypes.number,
  updateNavSwitch: PropTypes.func,
};

AlbumNav.defaultProps = {
  thumbnailHeight: 80
}

export default AlbumNav;
