import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { defaultImg }from '../../utils/cloudinaryApi';
import classNames from 'classnames';
// import { Breakpoint } from 'react-socks';

const isActive = ({ isCurrent }) => {
  return isCurrent ? {className:'album-btn selected-nav'}:{className: 'album-btn'}
}

const NavButton = ({ navTag, thumbSize }) => (
  <Link getProps={isActive} to={`/artwork/album/${navTag.tag}`}>
    <Image className="album-btn" publicId={navTag.thumbnail}>
      <Transformation defaultImage={defaultImg} />
      <Transformation height={thumbSize} width={thumbSize} crop="fill" />
    </Image>
    <div className="ablum-name">{navTag.name}</div>
  </Link>
)


NavButton.propTypes = {
  navTag: PropTypes.object.isRequired,
  thumbSize: PropTypes.number
};

NavButton.defaultProps = {
  thumbSize: 80
}

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


