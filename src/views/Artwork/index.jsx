import React from 'react';
import FilteredGallery from '../../components/FilteredGallery';

const ArtworkPage = () => {
  return (
    <div className="content">
      <FilteredGallery selectLightbox={this.props.selectLightbox} />
    </div>
  )
}

export default ArtworkPage;
