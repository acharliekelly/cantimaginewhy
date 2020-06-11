import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortGallery, getThumbnailSize } from '../utils/imageApi';
import { fetchGallery } from '../utils/cloudinaryApi';
import ThumbGallery from '../components/ThumbGallery';

export default class GalleryContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      imageGallery: [],
      currentIndex: 0
    }
  }

  componentDidMount () {
    const { currentNav } = this.props;
    fetchGallery(currentNav.tag).then(resources => {
      const sorted = sortGallery(currentNav, resources);
      this.setState({
        imageGallery: sorted
      })
    }).catch(err => console.error(err))
  }

  selectImage = index => {
    this.setState({
      currentIndex: index
    })
  }

  render () {
    const { imageGallery, currentIndex } = this.state;
    const size = getThumbnailSize(imageGallery.length);
    return (
      <ThumbGallery 
        galleryImages={imageGallery}
        imageIndex={currentIndex}
        selectThumbnail={this.selectImage}
        thumbSize={size}
      />
    )
  }
}

GalleryContainer.propTypes = {
  currentNav: PropTypes.object.isRequired
}