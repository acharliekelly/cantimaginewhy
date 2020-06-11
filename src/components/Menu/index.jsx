import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ExternalLink from '../Buttons/ExternalLink';
import { itemDisplayTypes } from '../../utils/constants';

import './menu.scss';

// TODO: make this better

const externalPage = item => (
  <ExternalLink 
    placement="right"
    variant="outline-info"
    destinationUrl={item.location}
    showIcon>
      {item.name}
  </ExternalLink>
);

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : {}
}

const isChildActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent ? { className: 'active' } : {}
}

const MenuLink = props => {
  const { item, subMenu, displayStyle, minimize } = props;
  const display = minimize ? itemDisplayTypes.iconOnly : displayStyle;
  let location = item.location;
  let activeFn = isActive;

  if (subMenu) { // section link
    location = `../${location}`;
  } else if (location !== '/') { // top-level page link, not Home
    activeFn = isChildActive;
  }

  return (
    <Link getProps={activeFn} to={location}>
      {menuContent(item, display)}
    </Link>
  )
  
}


const menuContent = (item, displayStyle) => {
  switch (displayStyle) {
    case itemDisplayTypes.iconOnly:
      return <FontAwesomeIcon icon={item.icon} title={item.name} />
    case itemDisplayTypes.textOnly:
      return <span className="link-text">{item.name}</span>
    default: // icon and text
      return (
        <>
          <FontAwesomeIcon icon={item.icon} title={item.name} />
          <span className="link-text">{item.name}</span>
        </>
      )
  }
}


const Menu = props => {
  const { items, navClass, minimize } = props;
  let list = items;
  if (minimize) {
    list = items.filter(item => !item.external)
  }
  
  return (
    <Nav className={navClass}>
      {list.map((item, index) => (
        <Nav.Item key={index} className={classNames({'icon': minimize})}>
          {item.external ? externalPage(item) : (
            <MenuLink item={item} {...props} />
          )}
        </Nav.Item>
      ))}
    </Nav>
  )
}

Menu.propTypes = {
  /**
   * the list of menu items
   */
  items: PropTypes.array.isRequired,

  /**
   * the className of the nav element
   */
  navClass: PropTypes.string,

  /**
   * not top-level menu
   */
  subMenu: PropTypes.bool,

  /**
   * itemDisplayTypes
   */
  displayStyle: PropTypes.number,

  /**
   * as small as possible
   */
  minimize: PropTypes.bool
}

Menu.defaultProps = {
  navClass: 'menu-nav',
  subMenu: false,
  displayStyle: itemDisplayTypes.textOnly,
  minimize: false
}


export default Menu;