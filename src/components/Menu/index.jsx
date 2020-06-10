import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../Buttons/ExternalLink';

import './menu.scss';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : {}
}

const isChildActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent ? { className: 'active' } : {}
}

const MenuLink = props => {
  const { item, subMenu, icons } = props;
  let location = item.location;
  let activeFn = isActive;
  if (subMenu) { // section link
    location = `../${location}`;
  } else if (location !== '/') { // top-level page link, not Home
    activeFn = isChildActive;
  }
  return (
    <Link getProps={activeFn} to={location}>
      {icons && <FontAwesomeIcon icon={item.icon}/>} {item.name}
    </Link>
  )

}


const Menu = props => {
  const { items, navClass, subMenu, icons } = props;
  return (
    <Nav className={navClass}>
      {items.map((item, index) => (
        <Nav.Item key={index}>
          {item.external ? externalPage(item) : (
            <MenuLink subMenu={subMenu} item={item} icons={icons} />
          )}
        </Nav.Item>
      ))}
    </Nav>
  )
}

Menu.propTypes = {
  items: PropTypes.array.isRequired,
  navClass: PropTypes.string,
  subMenu: PropTypes.bool,
  icons: PropTypes.bool
}

Menu.defaultProps = {
  navClass: 'menu-nav',
  subMenu: false,
  icons: false
}

const externalPage = item => (
  <ExternalLink 
    placement="right"
    variant="outline-info"
    destinationUrl={item.location}
    showIcon>
      {item.name}
  </ExternalLink>
);


export default Menu;