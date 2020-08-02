import React from 'react';

import ImageZoom from '../ImageZoom';

const withLightbox = props => WrappedComponent => {
  class WithLightbox extends React.Component {
    constructor () {
      super();
      this.state = {
        lightboxOpen: false,
        lightboxImages: [],
        lightboxCurrentIndex: 0
      }
    }

    lightboxArray = (imageList, currentIndex) => {
      if (imageList) {
        this.setState({
          lightboxImages: imageList,
          lightboxCurrentIndex: currentIndex,
          lightboxOpen: true
        })
      }
    }

    selectLightboxImage = (images = [], currentIndex = 0) => {
      // find out if using imageId or image array
      if (images) {
        this.lightboxArray(images, currentIndex);
      }
    }

    closeLightbox = () => {
      this.setState({
        lightboxOpen: false,
        lightboxImages: [],
        lightboxCurrentIndex: 0
      })
    }

    moveNext = () => {
      const next = (this.lightboxCurrentIndex + 1) % this.lightboxImages.length;
      this.setState({
        lightboxCurrentIndex: next
      })
    }

    movePrevious = () => {
      const prev = (this.lightboxCurrentIndex 
        + this.lightboxImages.length - 1) % this.lightboxImages.length;
        this.setState({
          lightboxCurrentIndex: prev
        })
    }

    render () {
      const { lightboxOpen, lightboxCurrentIndex, lightboxImages } = this.state;
      return (
        <>
        <WrappedComponent 
          selectLightbox={this.selectLightboxImage} 
          setLightboxArray={this.lightboxArray}
          setLightboxImage={this.lightboxSingleImage}
          {...this.props} />
        {lightboxOpen && (
          <ImageZoom
            imageList={lightboxImages}
            selectedIndex={lightboxCurrentIndex}
            closeLightbox={this.closeLightbox}
            moveNext={this.moveNext}
            movePrevious={this.movePrevious}
          />
        )}
        </>
      )
    }
  }
  WithLightbox.displayName = `WithLightbox(${WrappedComponent.name})`;
  return WithLightbox;
}

export default withLightbox;
