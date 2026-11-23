import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { defaultImg }from '../../utils/cloudinaryApi';
import classNames from 'classnames';

const NavButton = props => {

  const { navTag, onSelectItem, isSelected } = props;
  const hover = ev => {
    props.onHover && props.onHover(ev.target.key)
  }
  return (
    <button
      type="button"
      aria-pressed={Boolean(isSelected)}
      className={classNames('album-btn', 'responsive', 'thumbnail', {'selected-nav': isSelected})}
      onClick={() => onSelectItem(navTag)}
      onMouseEnter={hover}
      onMouseLeave={props.onOut}
      onFocus={hover}
      onBlur={props.onOut}
      >
        <Image publicId={navTag.thumbnail} alt="">
          <Transformation defaultImage={defaultImg} />
          <Transformation 
            height={props.thumbnailHeight}
            width={props.thumbnailHeight}
            crop="fill" />
        </Image>
        <span className="album-name">{navTag.name}</span>
    </button>
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


