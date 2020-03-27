// USE FILTERS
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { selectLightboxUtil } from '../../utils/imageUtils';
import ImageGallery from '../../components/ImageGallery/';
import FilterNav from '../../components/FilterNav/';

import './artwork.scss';

const ArtworkPage = props => {
  const [ currentNav, setCurrentNav ] = useState(null);
  const [ emptyGallery, setEmptyGallery ] = useState(true);

  const clearGallery = () => {
    setEmptyGallery(true);
  }  
  const selectGallery = nav => {
    setEmptyGallery(false);
    setCurrentNav(nav);
  }
  return (
    <div className="content">

      <FilterNav 
        updateSelectNav={selectGallery} 
        updateClearGallery={clearGallery} />
      
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
