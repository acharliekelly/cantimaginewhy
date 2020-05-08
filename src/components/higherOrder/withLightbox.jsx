import React from 'react';

import ImageZoom from '../ImageZoom';

export function withLightbox(WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        lightboxOpen: false,
        selectedImageId: '',
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

    lightboxSingleImage = imageId => {
      if (imageId) {
        this.setState({
          selectedImageId: imageId,
          lightboxOpen: true
        })
      }
    }

    // same signature as in App.js
    selectLightboxImage = (imageId, images = [], currentIndex = -1) => {
      // find out if using imageId or image array
      if (images) {
        console.log('lightbox images: ' + images.length)
        // find out if using currentIndex or imageId
        if (currentIndex < 0 && imageId) {
          console.log('starting image: ' + imageId)
          // find index of imageId
          let index = images.findIndex(img => img.public_id === imageId);
          if (index < 0) index = 0;
          console.log('starting index: ' + index)
          this.lightboxArray(images, index);
        } else {
          // use provided index
          this.lightboxArray(images, currentIndex);
        } 
      } else {
        // use imageId
        this.lightboxSingleImage(imageId);
      }
    }

    closeLightbox = () => {
      this.setState({
        lightboxOpen: false,
        selectedImageId: '',
        lightboxImages: [],
        lightboxCurrentIndex: 0
      })
    }

    render () {
      const { lightboxOpen, lightboxCurrentIndex, selectedImageId, lightboxImages } = this.state;
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
            selectedImageId={selectedImageId}
            closeLightbox={this.closeLightbox}
          />
        )}
        </>
      )
    }
  }
}
