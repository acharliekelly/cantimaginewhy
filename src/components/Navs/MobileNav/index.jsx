import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { CloudinaryContext } from 'cloudinary-react';
import NavButton from '../NavButton';
import { albums } from '../../../config/albums';
import { withStacking } from '../../higherOrder/withStacking';


import '../nav.scss';

const MobileNav = props => {
  const [ selectedNav, setSelectedNav ] = useState(null);

  const { updateSelectNav } = props;

  const selectItem = navObj => {
    setSelectedNav(navObj);
    updateSelectNav(navObj);
  }

  return (
      <CloudinaryContext cloudName="cantimaginewhy">
         
        <Container className="album-bar justify-content-center">
          <ul className="albums">
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
          </ul>
        </Container>
      </CloudinaryContext>
    );
        
}

MobileNav.propTypes = {
  updateSelectNav: PropTypes.func,
  eventKeyName: PropTypes.string,
  variant: PropTypes.string,
  cardTitle: PropTypes.string
};

MobileNav.defaultProps = {
  eventKeyName: 'albums',
  variant: 'primary',
  cardTitle: 'Albums'
}



// export default withSizes(mapSizesToProps)(AlbumNav);
export default withStacking(MobileNav);
