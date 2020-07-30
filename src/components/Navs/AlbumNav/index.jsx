import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import classNames from 'classnames';

import NavButton from '../NavButton';
import HelpButton from 'Comps/Buttons/HelpButton/';
import ErrorAlert from 'Comps/Alerts/ErrorAlert';
import LoadingAlert from 'Comps/Alerts/LoadingAlert';
import NavSwitch from '../NavSwitch';


import '../nav.scss';

const AlbumNav = props => {
  const { albums, navDescription, selectedNav, updateSelectNav } = props;

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
          <NavSwitch type="album" {...props} />
          <Navbar.Text>
            <span className="browse-title">Browse by Album</span>
          </Navbar.Text>
          <HelpButton header="Albums" content={navDescription} size="2x" />
        </Navbar>

        <Container fluid="md" className={navBtnCls}>
        {albums.map((album, index) => {
          const selected = (selectedNav && selectedNav.tag === album.tag);
          return (
            <NavButton 
              key={index}
              navTag={album} 
              onSelectItem={updateSelectNav} 
              isSelected={selected} 
              {...props}
              />
            );
          })}
        </Container>
      </>
    );
        
}

export default AlbumNav;
