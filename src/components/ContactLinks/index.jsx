import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { links } from '../../config/links';
import { itemDisplayTypes } from '../../utils/constants';
import './links.scss';



const ItemIcon = ({ link }) => {
  const ico = (link.lib) ? [link.lib, link.icon] : link.icon;
  return <FontAwesomeIcon icon={ico} title={link.name} />
};


/**
 * This component is not aware of viewport size, but parent should be!
 * 
 */
const ContactLinks = ({ display, group }) => {
  // raw json list, filtered by group
  const listCls = classNames('links', { 'nav': group === 'head'});
  const list = group ? links.filter(link => link.groups.includes(group)) : links;
  
  return (
    <ul className={listCls}>
      {list.map((item, index) => (
        <li key={index}>
          <a target="_blank" rel="noopener noreferrer" href={item.url}>
            <ItemIcon link={item} />
            {display >= itemDisplayTypes.iconAndText && (
              <span className={classNames('link-text', 
              {'expand-text': display < itemDisplayTypes.description})}>
                {item.name}
              </span>
            )}
          </a>
          {display >= itemDisplayTypes.description && (
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
   * (itemDisplayTypes)
   * 1: icon
   * 3: text
   * 4: description
   */
  display: PropTypes.number.isRequired,
  /**
   * group filter
   * art || design || tech || head
   */
  group: PropTypes.string
}


ContactLinks.defaultProps = {
  display: itemDisplayTypes.iconOnly
};


export default ContactLinks;
