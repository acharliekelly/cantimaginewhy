import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { links } from '../../config/links';
import { withSizes } from 'react-sizes';

import './links.scss';



const getLink = (link, node) => (
  <a target="_blank" rel="noopener noreferrer" href={link.url}>
    {node}
  </a>
)

const getIcon = link => {
  const ico = (link.lib) ? [link.lib, link.icon] : link.icon;
  return <FontAwesomeIcon icon={ico} size="lg" title={link.name} />
};

const getText = link => (
  <span className="link-text">{link.name}</span>
);

const getUrlText = link => {
  let text;
  if (link.url.startsWith('#')) {
    // Command
    text = '';
  } else if (link.url.startsWith('mailto:')) {
    // email address
    text = link.url.slice(7);
  } else {
    // regular link
    text = link.url.split('://')[1];
  }
  return (
    <span className="url-text">{text}</span>
  )
}

const groupFilter = group => {
  return links.filter(link => link.groups.includes(group));
}

// Icon & Text, URL on hover
const getFull = link => {
  const icon = getIcon(link); 
  const text = getText(link);
  const url = getUrlText(link);
  return (
    <span className="mix-url">
      {icon}&nbsp;{text}&nbsp;{url}
    </span>
  )
}

// Icon & Text
const getMixed = link => {
  const icon = getIcon(link); 
  const text = getText(link);
  return (
    <span className="mix-show">
      {icon}&nbsp;{text}
    </span>
  )
}

const getNodeFunc = (displayType, isShowUrl) => {
  let nodeFn;
  switch (displayType) {
    case 'icon':
      nodeFn = getIcon;
    break;
    case 'text':
      nodeFn = getText;
    break;
    case 'full':
      nodeFn = isShowUrl ? getFull : getMixed
    break;
    default:
      nodeFn = getMixed
  }
  return nodeFn;
}

const createList = (list, horizontal, nodeFunc) => {
  const itemStyle = {
    border: 'none', 
    backgroundColor: 'transparent', 
    textAlign: horizontal ? 'center' : 'left',
    margin: horizontal ? '0 1%' : '1% 0',
    padding: 0
  }

  return (
    <ListGroup as="ul" className="links" horizontal={horizontal}>
      {list.map((link, index) => (
        <ListGroup.Item as="li" style={itemStyle} key={index} action>
        {getLink(link, nodeFunc(link))}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

const createNav = (nodeFunc, filter = '') => {
  const list = filter ? groupFilter(filter) : links;
  return (
    <Navbar text="dark" expand="md">
      <Navbar.Toggle aria-controls="connect-head-nav" />
      <Navbar.Collapse id="connect-head-nav">
        <Nav className="connect-nav">
          {list.map((link, index) => (
            <Nav.Item key={index}>
              {getLink(link, nodeFunc(link))}
            </Nav.Item>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const ContactLinks = props => {
  const { displayType, horizontal, group, component } = props;
  const { isIconOnly, isShowUrl } = props;
  
  
  let nodeFn;
  if (isIconOnly) {
    nodeFn = getIcon;
  } else {
    nodeFn = getNodeFunc(displayType, isShowUrl);
  }
  
  const list = group ? groupFilter(group) : links;

  if (component === 'nav') {
    return createNav(nodeFn)
  } else {
    // list
    return createList(list, horizontal, nodeFn)
  }
}

const mapSizesToProps = ({ width }) => ({
  isIconOnly: width < 360,
  isShowUrl: width > 1319,
  isHalfText: width < 480,
});

ContactLinks.propTypes = {
  /**
   * size variable ('sm'|'md'|...)
   * point at which to stop being horizontal
   */
  horizontal: PropTypes.string,
  /**
   * icon: Show icon only
   * text: Show text only
   * both: Show icon & text
   * hide: Show icon, text on hover
   * full: Show icon & text, url on hover
   */
  displayType: PropTypes.string.isRequired,
  /**
   * size variable (for FA icon)
   */
  size: PropTypes.string,
  /**
   * group filter
   * art || tech || contact
   */
  group: PropTypes.string,
  /**
   * list || nav
   */
  component: PropTypes.string
};

ContactLinks.defaultProps = {
  displayType: 'icon',
  size: 'lg',
  component: 'list'
};


export default withSizes(mapSizesToProps)(ContactLinks);


