import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Image, Transformation } from 'cloudinary-react';

import { defaultImg } from 'Api/cloudinaryApi';
import HelpButton from 'Comps/Buttons/HelpButton/';
import NavSwitch from 'Comps/Navs/NavSwitch';
import ErrorAlert from 'Comps/Alerts/ErrorAlert';
import LoadingAlert from 'Comps/Alerts/LoadingAlert';
import 'Style/nav.scss';

const FilterNav = props => {
  const { filters, navDescription, filterIndex, selectedNav, filterOptions, thumbSize  } = props;
  const { updateNavSwitch, setFilterIndex, updateSelectNav } = props;

  const [ hoverFilterIndex, setHoverFilterIndex ] = useState(-1);
  const [ hoverNavIndex, setHoverNavIndex ] = useState(-1);

  const selectFilter = index => {
    // const key = ev.target.eventKey;
    setFilterIndex(index);

    // clear thumbnails
    props.updateClearGallery();
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

  const navDescCls = hoverNavIndex >= 0 ? 'hover-on' : 'hover-off';
  const albumDesc = hoverNavIndex >= 0 ? filterOptions[hoverNavIndex].description : '';
  const descStyle = { width: `${props.thumbSize * 3}px` };

  if (props.error) {
    return <ErrorAlert error={props.error} />
  } else if (props.isLoading) {
    return <LoadingAlert />
  }
  return (
    <>
      <Navbar className="category-bar justify-content-between">

        <NavSwitch type="filter" updateNavSwitch={updateNavSwitch} />

        <Container className="filter-wrapper justify-content-center" lg={4} md={6} sm={8}>
          <ListGroup className="filters" horizontal="md">
            <Navbar.Text 
              className="lbl" 
              style={{paddingRight: '1em', paddingTop: '0.5em'}}>
                Filter: 
            </Navbar.Text>
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
                  onMouseLeave={hoverOffFilter}
                  onClick={() => selectFilter(index)}>
                  {filter.name}
                </ListGroup.Item>
                )})}
            </ListGroup>
          </Container>
            
          <HelpButton header="Filters" content={navDescription} size="2x" />
            
      </Navbar>

      

      <Container expand="lg" className="album-bar albums">
        <div className="descript album-desc" style={descStyle}>
          <Navbar.Text className={navDescCls}>{albumDesc}</Navbar.Text>
        </div>

        <div className="descript category-desc" style={descStyle}>
          <Navbar.Text className={filterDescClass}>{filters[filterDescIndex].description}</Navbar.Text>
        </div>

        {filterOptions.map((option, index) => {
          let cls = 'album-btn responsive thumbnail';
          if (selectedNav && selectedNav.tag === option.tag) {
            cls += ' selected-nav'
          }
          return (
            <span key={option.tag} id={option.tag} className={cls} 
              onClick={() => updateSelectNav(option)}
              onMouseEnter={() => hoverOnNav(index)}
              onMouseLeave={hoverOffNav}
              >
              <Image publicId={`${option.thumbnail}`}>
                <Transformation defaultImage={defaultImg} />
                <Transformation height={thumbSize} width={thumbSize} crop="fill" />   
              </Image>
              <div className="album-name">{option.name}</div>
            </span>
          );
        })}
        
      </Container>
    </>
  );
}

export default FilterNav;
