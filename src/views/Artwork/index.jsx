import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { selectLightboxUtil } from '../../utils/imageUtils';
import ImageGallery from '../../components/ImageGallery/';
import FilterNav from '../../components/FilterNav/';
import AlbumNav from '../../components/AlbumNav/';

import './artwork.scss';

// FILTER = 0, ALBUM = 1

const galleryDescriptions = [
  'Filters artwork by commonalities, such as medium or location. One image can appear in multiple categories, and only includes most recent work.',
  'Group artwork by somewhat arbitrary Album names, but each image should appear in only one album. Includes early work left out of filters.'
]

const getType = ev => {
  return parseInt(ev.target.id.split('-')[1])
}

const ArtworkPage = props => {
  const [ galleryType, setGalleryType ] = useState(0);
  const [ currentLabel, setCurrentLabel ] = useState(0);
  const [ currentNav, setCurrentNav ] = useState(null);
  const [ emptyGallery, setEmptyGallery ] = useState(true);

  const clearGallery = () => {
    setEmptyGallery(true);
  }  
  const selectGallery = nav => {
    setEmptyGallery(false);
    setCurrentNav(nav);
  }
  
  const typeClass = type => {
    let cls = 'option';
    if (type === galleryType) cls += ' selected';
    return cls;
  }

  const typeSwitch = ev => {
    setGalleryType(getType(ev))
  }

  // set description to hovered type
  const typeHover = ev => {
    const type = getType(ev);
    return setCurrentLabel(type);
  }

  // revert description to gallery type
  const typeExit = ev => {
    setCurrentLabel(galleryType)
  }

  return (
    <div className="content">
      <div className="gallery-switch">
        <span className="label">Gallery: </span>
        <span 
          id="gt-0" 
          className={typeClass(0)} 
          onClick={typeSwitch}
          onMouseEnter={typeHover}
          onMouseLeave={typeExit}
          >Filters</span>
        <span 
          id="gt-1" 
          className={typeClass(1)} 
          onClick={typeSwitch}
          onMouseEnter={typeHover}
          onMouseLeave={typeExit}
          >Albums</span>
        <span className="gallery-description">
          {galleryDescriptions[currentLabel]}
        </span>
      </div>

      {galleryType === 1 ? (
        <AlbumNav updateSelectNav={selectGallery} updateClearGallery={clearGallery} />
      ) : (
        <FilterNav 
          updateSelectNav={selectGallery} 
          updateClearGallery={clearGallery} />
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
