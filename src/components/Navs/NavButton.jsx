import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { defaultImg }from '../../utils/cloudinaryApi';
import classNames from 'classnames';
import { Breakpoint } from 'react-socks';

const NavButton = props => {

  const { navTag, onSelectItem, isSelected } = props;
  const liClass = classNames('album-btn', 'responsive', 'thumbnail', {'selected-nav': isSelected});
  const hover = ev => {
    props.onHover && props.onHover(ev.target.key)
  }
  return (
    <li
      className={liClass}
      onClick={() => onSelectItem(navTag)}
      onMouseEnter={hover}
      onMouseLeave={props.onOut}
      >
        <Image publicId={navTag.thumbnail}>
          <Transformation defaultImage={defaultImg} />
          <Transformation 
            height={80} 
            width={80} 
            crop="fill" />
        </Image>
        <Breakpoint lg up>
          <div className="ablum-name">{navTag.name}</div>
        </Breakpoint>
    </li>
  )
}

NavButton.propTypes = {
  navTag: PropTypes.object,
  onSelectItem: PropTypes.func,
  thumbnailHeight: PropTypes.number,
  isSelected: PropTypes.bool,
  onHover: PropTypes.func,
  onOut: PropTypes.func
};

export default NavButton;
