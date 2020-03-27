import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { fetchGallery } from '../../utils/imageApi';
import { selectLightboxUtil} from '../../utils/imageUtils';


const Logo = props => {
  const { selectLightbox, startId } = props;

  const openZoom = () => {
    fetchGallery('logo').then(resources => {
      selectLightbox(startId, resources);
    })
  }

  return (
    <Image cloudName="cantimaginewhy" publicId="logo_th" 
      onClick={openZoom} title="Logo" style={{cursor: 'pointer'}}>
      <Transformation height="80" width="80" radius="max" crop="scale" />
    </Image>
  )
}

Logo.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  startId: PropTypes.string

}

Logo.defaultProps = {
  selectLightbox: selectLightboxUtil,
  startId: 'ciw4'
}

export default Logo;
