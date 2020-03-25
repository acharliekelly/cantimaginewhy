import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { links } from '../../config/links';

import './links.scss';



const getLink = (link, node) => (
    <a target="_blank" rel="noopener noreferrer" href={link.url}>
      {node}
    </a>
)

const getIcon = (link, size) => {
  const ico = (link.lib) ? [link.lib, link.icon] : link.icon;
  return <FontAwesomeIcon icon={ico} size={`${size}x`} title={link.name} />
};

const getText = (link, size) => (
  <span className="link-text" style={{fontSize: `${size}em`}}>{link.name}</span>
);

const getUrlText = (link, size) => {
  let text;
  if (link.url.startsWith('mailto:')) {
    text = link.url.slice(7);
  } else {
    text = link.url.split('://')[1];
  }
  return (
    <span className="url-text" style={{fontSize: `${size-1}em`}}>{text}</span>
  )
}

// Icon & Text, URL on hover
const getFull = (link, size) => {
  const icon = getIcon(link, size); 
  const text = getText(link, size);
  const url = getUrlText(link, size);
  return (
    <span className="mix-url">
      {icon}&nbsp;{text}&nbsp;{url}
    </span>
  )
}

// Icon & Text
const getMixed = (link, size) => {
  const icon = getIcon(link, size); 
  const text = getText(link, size);
  return (
    <span className="mix-show">
      {icon}&nbsp;{text}
    </span>
  )
}

// Icon, Text on hover
const getHidden = (link, size) => {
  const icon = getIcon(link, size); 
  const text = getText(link, size);
  return (
    <span className="mix-hide">
      {icon}&nbsp;{text}
    </span>
  )
}

const ContactLinks = props => {
  const { displayType, size, layout } = props;
  const cls = 'links ' + layout;
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
    <ul className={cls}>
      {links.map(link => (
        <li key={link.name}>
        {getLink(link, nodeFn(link, size))}
        </li>
      ))}
    </ul>
  )
}

ContactLinks.propTypes = {
  /**
   * 'horiz' || 'vert'
   */
  layout: PropTypes.string.isRequired,
  /**
   * icon: Show icon only
   * text: Show text only
   * both: Show icon & text
   * hide: Show icon, text on hover
   * full: Show icon & text, url on hover
   */
  displayType: PropTypes.string.isRequired,
  /**
   * height
   */
  size: PropTypes.number.isRequired
};

ContactLinks.defaultProps = {
  layout: 'horiz',
  displayType: 'icon',
  size: 2
};


export default ContactLinks;


