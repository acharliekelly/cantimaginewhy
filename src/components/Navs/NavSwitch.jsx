import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const navs = {
  filter: {
    icon: 'images',
    url: '/albums',
    title: 'Browse by Album'
  },
  album: {
    icon: 'filter',
    url: '/filters',
    title: 'Browse by Filter'
  }
}


const NavSwitch = props => {
  const nav = navs[props.type]
  return (
    <Button className="nav-switch" variant="outline-dark" onClick={props.updateNavSwitch}>
      <FontAwesomeIcon icon={nav.icon} title={nav.title} size="2x" />
    </Button>
  )
};

NavSwitch.propTypes = {
  type: PropTypes.string,
  updateNavSwitch: PropTypes.func
}

export default NavSwitch;
