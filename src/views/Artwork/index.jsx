import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import { selectLightboxUtil } from '../../utils/imageUtils';
import ImageGallery from '../../components/ImageGallery';

import './artwork.scss';


const ArtworkPage = props => {
  const [ galleryType, setGalleryType ] = useState(0);

  return (
    <div className="content">
      <div className="gallery-switch">
        <span className="label">Gallery: </span>
        <span className={'option' + (galleryType===0 ? ' selected' : '')} onClick={() => setGalleryType(0)}>Filters</span>
        <span className={'option' + (galleryType===1 ? ' selected' : '')} onClick={() => setGalleryType(1)}>Albums</span>
      </div>
      <ImageGallery 
        selectLightbox={props.selectLightbox} 
        galleryType={galleryType} 
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
