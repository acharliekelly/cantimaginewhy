import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Container from 'react-bootstrap/Container';
import classNames from 'classnames';

/**
 * Link object:
 * - name: link text
 * - desc: description
 * - lib: FA icon library (only for brand icons)
 * - icon: FontAwesome ID
 * - url: link destination
 * - groups: [ art, design, tech, head ] - only display in these groups
 */
// import { links } from '../../json/links';

import './links.scss';

const displayTypes = {
  icon: 1,
  text: 2,
  description: 3
}


const ItemIcon = ({ link }) => {
  const ico = (link.lib) ? [link.lib, link.icon] : link.icon;
  return <FontAwesomeIcon icon={ico} title={link.name} />
};


const ContactLinks = ({ links, display, group }) => {
  // raw json list, filtered by group
  const listCls = classNames('links', { 'nav': group === 'head'});
  const list = group ? links.filter(link => link.groups.includes(group)) : links;
  
  return (
    <ul className={listCls}>
      {list.map((item, index) => (
        <li key={index}>
          <a target="_blank" rel="noopener noreferrer" href={item.url}>
            <ItemIcon link={item} />
            {display >= displayTypes.text && (
              <span className={classNames('link-text', {'expand-text': display < 3})}>{item.name}</span>
            )}
          </a>
          {display >= displayTypes.description && (
            <span className="link-desc">{item.desc}</span>
          )}
        </li>
      ))}
    </ul>
  )
}


ContactLinks.propTypes = {
  /**
   * display style:
   * - 0: none
   * - 1: icon
   * - 2: icon and name
   * - 4: icon, name, and description
   */
  display: PropTypes.number.isRequired,
  /**
   * group filter
   * art || design || tech || head
   */
  group: PropTypes.string
}


ContactLinks.defaultProps = {
  display: 1
};


export default ContactLinks;
