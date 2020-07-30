import React from 'react';

import ImageZoom from 'Containers/ImageZoom';

export function withLightbox(WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props);
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
          />
        )}
        </>
      )
    }
  }
}
