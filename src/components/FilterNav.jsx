import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { filters } from '../utils/filters';
import '../css/galleryNav.scss';

const FilterNav = props => {
  // const [filterIndex, setFilterIndex] = useState(0);
  const [selectedNav, setSelectedNav] = useState(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const handleFilterSelect = eventKey => {
    setSelectedFilterIndex(eventKey);
    setSelectedNav(null);
    props.handleClearGallery();
  };

  const handleNavClick = nav => {
    setSelectedNav(nav);
    props.handleNavChange(nav.tag);
  }

  if (props.filterIndex) {
    setSelectedFilterIndex(props.filterIndex);
  }
  
  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      {/* Filter types */}
      <Nav 
        variant="pills" 
        defaultActiveKey={0} 
        className="gallery-nav justify-content-center" 
        onSelect={handleFilterSelect}
      >
        <span className="label">Filter By:</span>
        {filters.map(filter => (
          <Nav.Item key={filter.name}>
            <Nav.Link eventKey={filter.index}>{filter.name}</Nav.Link>
          </Nav.Item>
          )
        )}
      </Nav>
      {/* actual filters, with thumbnails  */}
      <div className="album-list">
        {filters[selectedFilterIndex].options.map(option => {
            let cls = 'album-btn responsive thumbnail';
            if (selectedNav && selectedNav.tag === option.tag) {
              cls += ' selected-nav'
            }
            return (
              <div key={option.tag} id={option.tag} className={cls} onClick={() => handleNavClick(option)}>
                  <Image  
                      publicId={`${option.thumbnail}`}
                      height="60"
                      crop="fit"
                      quality="80"
                  >
                      <Transformation quality="auto" fetchFormat="auto" />
                  </Image>
                  <div className="album-name">{option.name}</div>
              </div>
            );
          })}
        </div>
      {selectedNav && (
        <div className="current-nav">
          <div className="nav-title">{selectedNav.name}</div>
          <div className="nav-description">{selectedNav.description}</div>
        </div>
      )}
    </CloudinaryContext>
  );
}

FilterNav.propTypes = {
  handleNavChange: PropTypes.func.isRequired,
  handleClearGallery: PropTypes.func,
  filterIndex: PropTypes.number
};

export default FilterNav;
