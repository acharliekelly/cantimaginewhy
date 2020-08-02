import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import HelpButton from 'Comps/Buttons/HelpButton/';
import ToggleButton from 'Comps/Buttons/ToggleButton';
import GalleryGroup from 'Comps/Buttons/GalleryGroup';
import NavSwitch from 'Comps/Navs/NavSwitch';
import ErrorAlert from 'Comps/Alerts/ErrorAlert';
import LoadingAlert from 'Comps/Alerts/LoadingAlert';
import 'Style/nav.scss';

// TODO: add filter hover effects once everything else works

/**
 * Redux-connected
 * @param {Object} props 
 */
const FilterNav = props => {
  const { filters, navDescription, filterIndex, selectedNav, filterOptions  } = props;
  const { updateNavSwitch, setFilterIndex, updateSelectNav } = props;

  // const [ hoverFilterIndex, setHoverFilterIndex ] = useState(-1);
  // const [ hoverNavIndex, setHoverNavIndex ] = useState(-1);
  const [ isCollapsed, setIsCollapsed ] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const selectFilter = index => {
    // const key = ev.target.eventKey;
    setFilterIndex(index);

    // clear thumbnails
    props.updateClearGallery();
  }

  const itemStyle = isActive => {
    const active = {
      backgroundColor: '#222',
      borderColor: '#222',
      color: '#fff'
    }
    
    return isActive ? active : {};
  }

  if (props.error) {
    return <ErrorAlert error={props.error} />
  } else if (props.isLoading) {
    return <LoadingAlert />
  }
  return (
    <>
      <Navbar className="category-bar justify-content-between">

        <NavSwitch type="filter" updateNavSwitch={updateNavSwitch} />
        <ToggleButton 
            toggleState={isCollapsed} 
            toggleAction={toggleCollapse}
            style={{marginLeft: '0.5em'}}
          /> 

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
                  onClick={() => selectFilter(index)}>
                  {filter.name}
                </ListGroup.Item>
                )})}
            </ListGroup>
          </Container>
            
          <HelpButton header="Filters" content={navDescription} size="2x" />
            
      </Navbar>

      

      <Container expand="lg" className="album-bar albums">
        <GalleryGroup 
          galleryList={filterOptions}
          selectTagHandler={updateSelectNav}
          selectedTag={selectedNav}
          isCollapsed={isCollapsed}
          isInline={true}
        />
      </Container>
    </>
  );
}

export default FilterNav;
