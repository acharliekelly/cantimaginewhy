import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { fetchGallery }from '../../utils/cloudinaryApi';
import { withLightbox } from '../higherOrder/withLightbox';

const LOGO_ID = 'icon/logo';


const Logo = props => {
  const { selectLightbox, startId, enableEaster } = props;

  const openZoom = () => {
    if (enableEaster) {
      fetchGallery('cant-imagine').then(resources => {
        selectLightbox(startId, resources);
      })
    }
  }

  const logoTitle = enableEaster ? 'View all logo designs' : 'Home';

  const logoStyle = {
    cursor: 'pointer'
  }

  if (enableEaster) {
    return (
      <Image cloudName="cantimaginewhy" publicId={LOGO_ID} 
        onClick={openZoom} title={logoTitle} style={logoStyle}>
        <Transformation height="80" width="80" crop="scale" />
      </Image>
    )
  } else {
    return (
      <NavLink to="/home">
        <Image cloudName="cantimaginewhy" publicId={LOGO_ID} title={logoTitle} style={logoStyle}>
          <Transformation height="80" width="80" crop="scale" />
        </Image>
      </NavLink>
    )
  }
}

Logo.propTypes = {
  selectLightbox: PropTypes.func,
  setLightboxArray: PropTypes.func,
  startId: PropTypes.string,
  enableEaster: PropTypes.bool
}

Logo.defaultProps = {
  startId: LOGO_ID,
  enableEaster: false
}

export default withLightbox(Logo);
