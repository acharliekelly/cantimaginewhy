import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { fetchGallery }from 'Api/cloudinaryApi';
import { withLightbox } from '../higherOrder/withLightbox';

//! TODO: create container, remove withLightbox
const Logo = props => {
  const { selectLightbox, startId, enableEaster } = props;

  const openZoom = () => {
    if (enableEaster) {
      fetchGallery('cant-imagine').then(resources => {
        selectLightbox(startId, resources);
      })
    }
  }

  const logoTitle = enableEaster ? 'View all logo designs' : 'Logo';

  const logoStyle = {
    cursor: enableEaster ? 'pointer' : 'default'
  }

  return (
    <Image cloudName="cantimaginewhy" publicId="icon/logo" 
      onClick={openZoom} title={logoTitle} style={logoStyle}>
      <Transformation height="80" width="80" crop="scale" />
    </Image>
  )
}

Logo.propTypes = {
  selectLightbox: PropTypes.func,
  setLightboxArray: PropTypes.func,
  startId: PropTypes.string,
  enableEaster: PropTypes.bool
}

Logo.defaultProps = {
  startId: 'icon/ciw4',
  enableEaster: false
}

export default withLightbox(Logo);
