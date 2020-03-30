import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { filters, navDescription } from '../../config/filters';
import HelpButton from '../Buttons/HelpButton/';
import '../../css/nav.scss';

const FilterNav = props => {
  const [ filterIndex, setFilterIndex ] = useState(0);
  const [ hoverIndex, setHoverIndex ] = useState(-1);
  const [ selectedNav, setSelectedNav ] = useState(null);

  const selectFilter = index => {
    // const key = ev.target.eventKey;
    setFilterIndex(index);
    setSelectedNav(null);

    // clear thumbnails
    props.updateClearGallery();
  }

  const selectItem = nav => {
    // nav is object (option) from filter list
    // { name, tag, thumbnail, description, sortField }
    setSelectedNav(nav);
    props.updateSelectNav(nav);
  }

  const hoverOnFilter = index => {
    // const index = ev.target.eventKey
    setHoverIndex(index);
  }

  const hoverOff = () => {
    setHoverIndex(-1);
  }

  const itemStyle = isActive => {
    const active = {
      backgroundColor: '#222',
      borderColor: '#222',
      color: '#fff'
    }
    
    return isActive ? active : {};
  }


  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <Navbar className="category-bar justify-content-between">

        <Button className="nav-switch" variant="outline-dark" onClick={props.updateSwitch}>
          <FontAwesomeIcon icon="images" title="Browse by Album" size="2x" />
        </Button>

        <Container className="filter-wrapper justify-content-center" lg={4} md={6} sm={8}>
          <ListGroup className="filters" horizontal="md">
            <Navbar.Text className="lbl" style={{paddingRight: '1em'}}>Filter: </Navbar.Text>
            {filters.map((filter, index) => {
              const isActive = (index === filterIndex);
              return(
              <ListGroup.Item 
                action
                active={isActive}
                style={itemStyle(isActive)}
                key={index}
                eventKey={index} 
                onMouseEnter={() => hoverOnFilter(index)}
                onMouseLeave={hoverOff}
                onClick={() => selectFilter(index)}>
                  {filter.name}
                </ListGroup.Item>
            )})}
          </ListGroup>
          </Container>
            
          <HelpButton header="Filters" content={navDescription} size="2x" />
            
      </Navbar>

      

      <Container expand="lg" className="album-bar">


        <div className="category-desc">
          {hoverIndex >= 0 ? (
            <Navbar.Text className="hover-desc">{filters[hoverIndex].description}</Navbar.Text>
          ) : (
            <Navbar.Text className="active-desc">{filters[filterIndex].description}</Navbar.Text>
          )}
        </div>
        

        <ul className="albums">
          {filters[filterIndex].options.map(option => {
            let cls = 'album-btn responsive thumbnail';
            if (selectedNav && selectedNav.tag === option.tag) {
              cls += ' selected-nav'
            }
            return (
              <li key={option.tag} id={option.tag} className={cls} onClick={() => selectItem(option)}>
                <Image publicId={`${option.thumbnail}`}>
                  <Transformation defaultImage={defaultImg} />
                  <Transformation height={props.thumbSize} width={props.thumbSize} crop="fill" />   
                </Image>
                <div className="album-name">{option.name}</div>
              </li>
            );
          })}
        </ul>
      </Container>
    </CloudinaryContext>
  );
}

FilterNav.propTypes = {
  updateSelectNav: PropTypes.func.isRequired,
  updateClearGallery: PropTypes.func,
  thumbSize: PropTypes.number
};

FilterNav.defaultProps = {
  thumbSize: 80
}

export default FilterNav;
