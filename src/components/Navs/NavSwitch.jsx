import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const navs = {
  'filter': {
    icon: 'images',
    url: '/artwork/albums',
    title: 'Browse by Album'
  },
  'album': {
    icon: 'filter',
    url: '/artwork/filters',
    title: 'Browse by Filter'
  }
}


const NavSwitch = props => {
  const nav = navs[props.navType]
  return (
    <Link to={nav.url}>
      <Button className="nav-switch" variant="outline-dark">
        <FontAwesomeIcon icon={nav.icon} title={nav.title} size="2x" />
      </Button>
    </Link>
  )
};

NavSwitch.propTypes = {
  navType: PropTypes.string
}

export default NavSwitch;
