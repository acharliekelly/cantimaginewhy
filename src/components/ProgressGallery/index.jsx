import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { onsiteViewImages, onsiteProgressImages, onsiteFinalImage } from '../../utils/processImages';

class ProgressGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      viewImages: [],
      progressImages: [],
      finalImage: '',
      isLoaded: false
    }
  }

  componentDidUpdate () {
    const { refKey } = this.props;
    console.log('refKey property: ' + refKey);
    if (!this.state.isLoaded) {
      this.updateImages(refKey);
      console.log('View: ' + this.state.viewImages)
      console.log('Progress: ' + this.state.progressImages)
      console.log('Final: ' + this.state.finalImage);
    }
  }

  updateImages = refKey => {
    console.log('updating process images for #' + refKey);
    this.setState({
      viewImages: onsiteViewImages(refKey),
      progressImages: onsiteProgressImages(refKey),
      finalImage: onsiteFinalImage(refKey),
      isLoaded: true
    })
  }

  handleImageClick = ev => {
    // TODO: expand images
  }

  render () {
    const { viewImages, progressImages, finalImage, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1 className="loading">Loading</h1>
    } else {
      return (
        <div className="process-images">
          <div className="view">
            <label>View Images: <strong>{viewImages.length}</strong></label>
            <span className="view-imgs">
            {viewImages.map(imageId => (
              <Image 
                className="responsive thumbnail" 
                cloudName="cantimaginewhy" 
                publicId={imageId} 
                height="80"
              />
            ))}
            </span>
          </div>
          <div className="progress">
            <label>Progress Images: <strong>{progressImages.length}</strong></label>
            <span className="progress-imgs">
              {progressImages.map(imageId => (
                <Image 
                  cloudName="cantimaginewhy" 
                  className="responsive thumbnail"
                  publicId={imageId}
                  height="80"
                />
              ))}
            </span>
          </div>
          <div className="final">
            <label>Final Image: <strong>{finalImage ? 1 : 0}</strong></label>
            <span className="final-img">
              {finalImage && (
                <Image 
                  cloudName="cantimaginewhy" 
                  className="responsive thumbnail"
                  publicId={finalImage}
                  height="80"
                />
              )}
            </span>
          </div>
        </div>
      )
    }
  }
}

ProgressGallery.propTypes = {
  refKey: PropTypes.string.isRequired,
  openLightbox: PropTypes.func
}

export default ProgressGallery;
