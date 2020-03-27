import React, { useState } from './react';
import PropTypes from './prop-types';
import { selectLightboxUtil } from '/utils/imageUtils';
import ImageGallery from '../../components/ImageGallery/';
import FilterNav from '../../components/FilterNav/';
import AlbumNav from '../../components/AlbumNav/';

import './artwork.scss';


const ArtworkPage = props => {
  const [ navFilter, setNavFilter ] = useState(true);  // true = filter
  const [ currentNav, setCurrentNav ] = useState(null);
  const [ emptyGallery, setEmptyGallery ] = useState(true);

  const clearGallery = () => {
    setEmptyGallery(true);
  }  
  const selectGallery = nav => {
    setEmptyGallery(false);
    setCurrentNav(nav);
  }
  
  const switchNavType = () => {
    setNavFilter(!navFilter);
  }

  return (
    <div className="content">

      { navFilter ? (
        <FilterNav 
          updateSelectNav={selectGallery} 
          updateClearGallery={clearGallery} 
          updateSwitch={switchNavType}
          />
      ) : (
        <AlbumNav
          updateSelectNav={selectGallery}
          updateClearGallery={clearGallery}
          updateSwitch={switchNavType}
        />
      )}
      
      <ImageGallery 
        selectLightbox={props.selectLightbox} 
        isGalleryEmpty={emptyGallery}
        currentAlbum={currentNav}
      />
    </div>
  )
}

ArtworkPage.propTypes = {
  selectLightbox: PropTypes.func.isRequired
}
ArtworkPage.defaultProps = {
  selectLightbox: selectLightboxUtil
}

export default ArtworkPage;
