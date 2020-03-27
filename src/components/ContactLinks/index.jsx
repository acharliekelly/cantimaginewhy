import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListGroup from 'react-bootstrap/ListGroup';
import { links } from '../../config/links';

import './links.scss';



const getLink = (link, node) => (
    <a target="_blank" rel="noopener noreferrer" href={link.url}>
      {node}
    </a>
)

const getIcon = (link, iconSize, textSize) => {
  const ico = (link.lib) ? [link.lib, link.icon] : link.icon;
  return <FontAwesomeIcon icon={ico} size={iconSize} title={link.name} />
};

const getText = (link, iconSize, textSize) => (
  <span className="link-text" style={{fontSize: textSize}}>{link.name}</span>
);

const getUrlText = (link, iconSize, textSize) => {
  let text;
  if (link.url.startsWith('mailto:')) {
    text = link.url.slice(7);
  } else {
    text = link.url.split('://')[1];
  }
  return (
    <span className="url-text">{text}</span>
  )
}

// Icon & Text, URL on hover
const getFull = (link, iconSize, textSize) => {
  const icon = getIcon(link, iconSize); 
  const text = getText(link, textSize);
  const url = getUrlText(link);
  return (
    <span className="mix-url">
      {icon}&nbsp;{text}&nbsp;{url}
    </span>
  )
}

// Icon & Text
const getMixed = (link, iconSize, textSize) => {
  const icon = getIcon(link, iconSize); 
  const text = getText(link, textSize);
  return (
    <span className="mix-show">
      {icon}&nbsp;{text}
    </span>
  )
}

// Icon, Text on hover
const getHidden = (link, iconSize, textSize) => {
  const icon = getIcon(link, iconSize); 
  const text = getText(link, textSize);
  return (
    <span className="mix-hide">
      {icon}&nbsp;{text}
    </span>
  )
}

const ContactLinks = props => {
  const { displayType, size, textSize, horizontal } = props;
  const itemStyle = {
    border: 'none', 
    backgroundColor: 'transparent', 
    textAlign: horizontal ? 'center' : 'left',
    margin: horizontal ? '0 3px' : '3px 0',
    fontSize: textSize,
    padding: 0
  }
  
  let nodeFn;
  switch (displayType) {
    case 'icon':
      nodeFn = getIcon;
    break;
    case 'text':
      nodeFn = getText;
    break;
    case 'hide':
      nodeFn = getHidden
    break;
    case 'full':
      nodeFn = getFull
    break;
    default:
      nodeFn = getMixed
  }
  return (
    <ListGroup as="ul" className="links" horizontal={horizontal}>
      {links.map(link => (
        <ListGroup.Item as="li" size={size} style={itemStyle} key={link.name} action>
        {getLink(link, nodeFn(link, size))}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

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
   * size variable
   */
  size: PropTypes.string,
  /**
   * font size, since bootstrap size has no impact on font
   */
  textSize: PropTypes.string
};

ContactLinks.defaultProps = {
  displayType: 'icon',
  size: 'lg',
  textSize: '1em'
};


export default ContactLinks;


