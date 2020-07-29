import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { defaultImg }from 'Api/cloudinaryApi';
import classNames from 'classnames';
import { Breakpoint } from 'react-socks';

const NavButton = props => {

  const { navTag, onSelectItem, isSelected } = props;
  const hover = ev => {
    props.onHover && props.onHover(ev.target.key)
  }
  return (
    <div
      className={classNames('album-btn', 'responsive', 'thumbnail', {'selected-nav': isSelected})}
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
    </div>
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


