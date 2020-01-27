import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageDisplay from './ImageDisplay';

const GalleryCarousel = props => {
  const [ currentImage, setCurrentImage ] = useState(null);


  // select by index
  const openImageIndex = index => {
    const { pictures, updateImage } = props;
    setCurrentImage(pictures[index]);
    updateImage(index);
  }

  const openNextImage = () => {
    const { pictures, currentIndex } = this.props;
    let index = currentIndex;
    if (index < pictures.length - 1) {
      index++;
    } else {
      index = 0;
    }
    openImageIndex(index);
  }

  const openPreviousImage = () => {
    const { pictures, currentIndex } = this.props;
    let index = currentIndex;
    if (index > 0) {
      index--;
    } else {
      index = pictures.length - 1;
    }
    openImageIndex(index);
  }

  // if (!props.currentIndex) {
  //   const { pictures, updateImage } = props;
  //   if (pictures.length > 0) {
  //     setCurrentImage(pictures[0]);
  //     updateImage(0)
  //   }
  // }


  return (
    <div className="image-box">
      <div className="image-nav-btn prev-btn" onClick={openPreviousImage}>
        <img alt="prev" src="https://res.cloudinary.com/cantimaginewhy/image/upload/a_hflip/a_0/v1575431164/icon/next-arrow-icon.png" />
      </div>
        <ImageDisplay 
          currentImage={currentImage}
        />
      <div className="image-nav-btn next-btn" onClick={openNextImage}>
        <img alt="next" src="https://res.cloudinary.com/cantimaginewhy/image/upload/v1575431164/icon/next-arrow-icon.png" />
      </div>
  </div>
  )


};

GalleryCarousel.propTypes = {
  pictures: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  updateImage: PropTypes.func.isRequired
};

export default GalleryCarousel;
