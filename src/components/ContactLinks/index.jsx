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
  return <FontAwesomeIcon icon={ico} size={`${size}x`} />
};

const getText = (link, size) => (
  <span className="link-text" style={{fontSize: `${size}em`}}>{link.name}</span>
);

const getMixed = (link, size) => {
  const icon = getIcon(link, size); 
  const text = getText(link, size);
  return (
    <span className="mix-show">
      {icon}&nbsp;{text}
    </span>
  )
}

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
   * 'icon' || 'text' || 'both'
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


