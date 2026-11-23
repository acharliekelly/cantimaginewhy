import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import { defaultImg }from '../../utils/cloudinaryApi';
import classNames from 'classnames';

const NavButton = props => {

  const { navTag, onSelectItem, isSelected, to } = props;
  const Control = to ? Link : 'button';
  const hover = ev => {
    props.onHover && props.onHover(ev.target.key)
  }
  return (
    <Control
      {...(to ? { to, 'aria-current': isSelected ? 'page' : undefined } : {
        type: 'button',
        'aria-pressed': Boolean(isSelected),
        onClick: () => onSelectItem(navTag)
      })}
      className={classNames('album-btn', 'responsive', 'thumbnail', {'selected-nav': isSelected})}
      onMouseEnter={hover}
      onMouseLeave={props.onOut}
      onFocus={hover}
      onBlur={props.onOut}
      >
        <Image publicId={navTag.thumbnail} alt="" width={props.thumbnailHeight} height={props.thumbnailHeight}>
          <Transformation defaultImage={defaultImg} />
          <Transformation 
            height={props.thumbnailHeight}
            width={props.thumbnailHeight}
            crop="fill" />
        </Image>
        <span className="album-name">{navTag.name}</span>
    </Control>
  )
}

NavButton.propTypes = {
  to: PropTypes.string,
  navTag: PropTypes.object,
  onSelectItem: PropTypes.func,
  thumbnailHeight: PropTypes.number,
  isSelected: PropTypes.bool,
  onHover: PropTypes.func,
  onOut: PropTypes.func
};

NavButton.defaultProps = { thumbnailHeight: 80 };

export default NavButton;

export const MobileNavButton = props => {
  const { navTag, onSelectItem, isSelected } = props;
  const cls = classNames('album-btn', 'responsive', 'thumbnail', {'selected-nav': isSelected})
  return (
    <Image 
      publicId={navTag.thumbnail}
      className={cls}
      onClick={() => onSelectItem(navTag)} >
      <Transformation defaultImage={defaultImg} />
      <Transformation 
        overlay={{ fontFamily: 'Arial', fontSize: 10, text: navTag.name }} 
        color={isSelected ? 'white' : 'black'}
        gravity="south" />
      <Transformation 
        height={80} 
        width={80} 
        crop="fill" />
    </Image>
  )
}


