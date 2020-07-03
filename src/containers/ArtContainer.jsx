import React from 'react';
import PropTypes from 'prop-types';

import { fetchGallery } from '../utils/cloudinaryApi';
import ThumbGallery from '../components/ThumbGallery';

class ArtContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageList: [],
      currentIndex: 0,
      isLoading: false,
      hasError: false
    }
  }

  componentDidMount () {
    const { tagName } = this.props;
    this.loadGallery(tagName);
  }

  selectImage = index => {
    this.setState({ currentIndex: index });
  }

  loadGallery = tagName => {
    this.setState({ isLoading: true });
    fetchGallery(tagName)
      .then(resources => this.setState({ imageList: resources }))
      .catch(() => this.setState({ hasError: true }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render () {
    const { imageList, currentIndex } = this.state;
    return (
      <ThumbGallery 
        galleryImages={imageList}
        imageIndex={currentIndex}
        selectThumbnail={this.selectImage} />
    )
  }
}

ArtContainer.propTypes = {
  tagName: PropTypes.string.isRequired
}