import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import NavButton from '../NavButton';
import { filters, navDescription } from '../../../config/filters';
import HelpButton from '../../Buttons/HelpButton/';
import NavSwitch from '../NavSwitch';
import '../nav.scss';

const FilterNav = props => {
  const [ filterIndex, setFilterIndex ] = useState(0);
  const [ hoverFilterIndex, setHoverFilterIndex ] = useState(-1);
  const [ hoverNavIndex, setHoverNavIndex ] = useState(-1);
  const [ selectedNav, setSelectedNav ] = useState(null);

  

  const selectFilter = index => {
    // const key = ev.target.eventKey;
    setFilterIndex(index);
    setHoverNavIndex(-1);
    setSelectedNav(null);

    // clear thumbnails
    props.updateClearGallery();
  }

  const selectItem = navObj => {
    // nav is object (option) from filter list
    // { name, tag, thumbnail, description, sortField }
    setSelectedNav(navObj);
    props.updateSelectNav(navObj);
  }


  const hoverOnNav = index => {
    setHoverNavIndex(index);
  }

  const hoverOffNav = () => {
    setHoverNavIndex(-1);
  }

  const hoverOnFilter = index => {
    // const index = ev.target.eventKey
    setHoverFilterIndex(index);
  }

  const hoverOffFilter = () => {
    setHoverFilterIndex(-1);
  }

  const itemStyle = isActive => {
    const active = {
      backgroundColor: '#222',
      borderColor: '#222',
      color: '#fff'
    }
    
    return isActive ? active : {};
  }

  const filterDescClass = hoverFilterIndex >= 0 ? 'hover-desc' : 'active-desc';
  const filterDescIndex = hoverFilterIndex >= 0 ? hoverFilterIndex : filterIndex;

  const albumDesc = hoverNavIndex >= 0 ? filters[filterIndex].options[hoverNavIndex].description : '';

  return (
    <>
      <Navbar className="category-bar filter-bar justify-content-between">

        <NavSwitch type="filter" {...props} />

        <Container className="filter-wrapper justify-content-center" lg={4} md={6} sm={8}>
          <ListGroup className="filters flex-row flex-wrap justify-content-center">
            {filters.map((filter, index) => {
              const isActive = (index === filterIndex);
              return(
              <ListGroup.Item 
                as="button"
                type="button"
                action
                active={isActive}
                style={itemStyle(isActive)}
                key={index}
                eventKey={index} 
                onMouseEnter={() => hoverOnFilter(index)}
                onMouseLeave={hoverOffFilter}
                onClick={() => selectFilter(index)}>
                  {filter.name}
                </ListGroup.Item>
            )})}
          </ListGroup>
          </Container>
            
          <HelpButton header="Filters" content={navDescription} size="2x" />
            
      </Navbar>

      

      <Container className="album-bar">
        <p className={`filter-description ${filterDescClass}`}>{albumDesc || filters[filterDescIndex].description}</p>
        <div className="albums">
          {filters[filterIndex].options.map((option, index) => (
            <NavButton
              key={option.tag}
              navTag={option}
              isSelected={selectedNav?.tag === option.tag}
              thumbnailHeight={props.thumbSize}
              onSelectItem={selectItem}
              onHover={() => hoverOnNav(index)}
              onOut={hoverOffNav}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

FilterNav.propTypes = {
  updateSelectNav: PropTypes.func,
  updateClearGallery: PropTypes.func,
  thumbSize: PropTypes.number,
  updateNavSwitch: PropTypes.func
};

FilterNav.defaultProps = {
  thumbSize: 80
}

export default FilterNav;
