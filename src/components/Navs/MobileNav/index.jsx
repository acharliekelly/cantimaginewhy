import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { MobileNavButton } from '../NavButton';
import { albums } from '../../../json/albums';
import { withStacking } from '../../higherOrder/withStacking';


import '../nav.scss';

const MobileNav = props => {
   const { updateSelectNav, selectedNav } = props;

  return (
    <Container className="album-bar justify-content-center albums">
    {albums.map((album, index) => {
      const selected = (selectedNav && selectedNav.tag === album.tag);
      return (
        <MobileNavButton 
          key={index}
          navTag={album} 
          onSelectItem={updateSelectNav} 
          isSelected={selected} 
          {...props}
          />
        );
      })}
    </Container>
  );
        
}

MobileNav.propTypes = {
  updateSelectNav: PropTypes.func,
  eventKeyName: PropTypes.string,
  variant: PropTypes.string,
  cardTitle: PropTypes.string,
  enabled: PropTypes.bool
};

MobileNav.defaultProps = {
  eventKeyName: 'albums',
  variant: 'primary',
  cardTitle: 'Albums',
  enabled: true,
}



// export default withSizes(mapSizesToProps)(AlbumNav);
export default withStacking(MobileNav);
