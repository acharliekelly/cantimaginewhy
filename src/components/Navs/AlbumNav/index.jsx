import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { CloudinaryContext } from 'cloudinary-react';
import NavButton from '../NavButton';
import { albums, navDescription } from '../../../config/albums';
import HelpButton from '../../Buttons/HelpButton/';
import NavSwitch from '../NavSwitch';
import { Breakpoint } from 'react-socks';
import classNames from 'classnames';

import '../nav.scss';

const AlbumNav = props => {
  const [ selectedNav, setSelectedNav ] = useState(null);

  const { updateSelectNav } = props;

  const selectItem = navObj => {
    setSelectedNav(navObj);
    updateSelectNav(navObj);
  }

  

  const navBarClass = classNames('category-bar', 
    { 
      'justify-content-between': updateSelectNav,
      'justify-content-around': !updateSelectNav
    }
  )

  return (
      <CloudinaryContext cloudName="cantimaginewhy">
         <Navbar className={navBarClass}>
           <Breakpoint lg up>
            <NavSwitch type="album" {...props} />
           </Breakpoint>
           
          <Navbar.Text>
            <span className="browse-title">Albums</span>
          </Navbar.Text>

          <Breakpoint lg up>
            <HelpButton header="Albums" content={navDescription} size="2x" />
          </Breakpoint>
        </Navbar>

        
        <Container fluid="md" className="album-bar justify-content-center albums">
          <Breakpoint lg up>
          {albums.map((album, index) => {
            const selected = (selectedNav && selectedNav.tag === album.tag);
            return (
              <NavButton 
                key={index}
                navTag={album} 
                onSelectItem={selectItem} 
                isSelected={selected} 
                {...props}
                />
              );
            })}
          </Breakpoint>

          
         
        </Container>
      </CloudinaryContext>
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
