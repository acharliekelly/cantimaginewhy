import React from 'react';
import { galleryTypes } from '../utils/constants';

import { ArtworkPage, MobilePage } from '../pages/Artwork';

export class ArtworkContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      navType: galleryTypes.album,
      selectedAlbum: null,
      thumbSize: 0,
      currentIndex: 0,
      artImages: [],
      productLookup: null,
      geotag: ''
    }
  }

  componentDidMount () {
    const { navOption, selectedNav, thumbSize, imageIndex, imageList } = this.props;
    this.setState({
      navType: navOption,
      selectedAlbum: selectedNav,
      thumbSize: thumbSize,
      currentIndex: imageIndex,
      artImages: imageList
    })
  }

  render () {
    const { viewportWidth } = this.props;
    const artProps = this.state;
    if (viewportWidth > 600) {
      return <ArtworkPage {...artProps} />
    } else {
      return <MobilePage {...artProps} />
    }
  }

}
