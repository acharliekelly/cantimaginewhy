import React from 'react';
import PropTypes from 'prop-types';
import { selectLightboxUtil } from '../../utils/imageUtils';
import FilteredGallery from '../../components/FilteredGallery';

const ArtworkPage = props => {
  return (
    <div className="content">
      <FilteredGallery selectLightbox={props.selectLightbox} />
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
