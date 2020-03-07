import React from 'react';
import PropTypes from 'prop-types';
import { selectLightboxUtil } from '../../utils/imageUtils';
import AlbumGallery from '../../components/AlbumGallery';

const ArtworkPage = props => {
  return (
    <div className="content">
      <AlbumGallery selectLightbox={props.selectLightbox} />
    </div>
  )
}

ArtworkPage.propTypes = {
  selectLightbox: PropTypes.func.isRequired
}
ArtworkPage.defaultProps = {
  selectLightbox: selectLightboxUtil
}

export default ArtworkPage;
