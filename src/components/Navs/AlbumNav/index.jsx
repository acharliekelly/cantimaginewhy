import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import classNames from 'classnames';

// import NavButton from '../NavButton';
import GalleryGroup from 'Comps/Buttons/GalleryGroup';
import HelpButton from 'Comps/Buttons/HelpButton/';
import ErrorAlert from 'Comps/Alerts/ErrorAlert';
import LoadingAlert from 'Comps/Alerts/LoadingAlert';
import NavSwitch from '../NavSwitch';
import ToggleButton from 'Comps/Buttons/ToggleButton';


import '../nav.scss';


/**
 * Redux-connected 
 * @param {Object} props 
 */
const AlbumNav = props => {
  const { albums, navDescription, selectedNav, updateSelectNav } = props;
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const navBarClass = classNames('category-bar', 
    { 
      'justify-content-between': updateSelectNav,
      'justify-content-around': !updateSelectNav
    }
  )
  const navBtnCls = classNames('album-bar', 'justify-content-center', 'albums');

  if (props.error) {
    return <ErrorAlert error={props.error} />
  } else if (props.isLoading) {
    return <LoadingAlert />
  }
  return (
      <>
        <Navbar className={navBarClass}>
          <NavSwitch type="album" updateNavSwitch={props.updateNavSwitch} />
          <ToggleButton 
            toggleState={isCollapsed} 
            toggleAction={toggleCollapse}
            style={{marginLeft: '0.5em'}}
          />

          <Navbar.Text>
            <span className="browse-title">Browse by Album</span>
          </Navbar.Text>
          <HelpButton header="Albums" content={navDescription} size="2x" />
        </Navbar>

        <Container fluid="md" className={navBtnCls}>
          <GalleryGroup  
            galleryList={albums}
            selectTagHandler={updateSelectNav}
            selectedTag={selectedNav}
            isCollapsed={isCollapsed}
            isInline={true}
          />
        </Container>
      </>
    );
        
}

export default AlbumNav;
