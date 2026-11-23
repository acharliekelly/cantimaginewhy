import React, { useState } from 'react';
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
  const [ selectedNav, setSelectedNav ] = useState(null);

  const { albumPath, selectedTag, thumbnailHeight, updateSelectNav } = props;

  const selectItem = navObj => {
    setSelectedNav(navObj);
    updateSelectNav(navObj);
  }

  

  const navBarClass = classNames('category-bar', 
    { 
      'justify-content-between': albumPath || updateSelectNav,
      'justify-content-around': !albumPath && !updateSelectNav
    }
  )
  const navBtnCls = classNames('album-bar', 'justify-content-center', 'albums');

  return (
      <>
         <Navbar className={navBarClass}>
          <NavSwitch type="album" {...props} />
          <Navbar.Text>
            <span className="browse-title">Browse by Album</span>
          </Navbar.Text>
          <HelpButton header="Albums" content={navDescription} size="2x" />
        </Navbar>

        <Container fluid="md" className={navBtnCls}>
        {albums.map(album => {
          const selected = (selectedTag || selectedNav?.tag) === album.tag;
          return (
            <NavButton 
              key={album.tag}
              to={albumPath?.(album)}
              navTag={album} 
              onSelectItem={selectItem} 
              isSelected={selected} 
              thumbnailHeight={thumbnailHeight}
              />
            );
          })}
        </Container>
      </>
    );
        
}

AlbumNav.propTypes = {
  albumPath: PropTypes.func,
  selectedTag: PropTypes.string,
  updateSelectNav: PropTypes.func,
  updateClearGallery: PropTypes.func,
  thumbnailHeight: PropTypes.number,
  updateNavSwitch: PropTypes.func,
};

AlbumNav.defaultProps = {
  thumbnailHeight: 80
}

export default AlbumNav;
