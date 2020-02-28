import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { getImageSeries } from '../../utils/processUtils';
import { defaultCPI } from '../../utils/imageApi';
import { selectLightboxUtil } from '../../utils/imageUtils';
import './process.scss';


class ProgressGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      progressImages: []
    }
  }

  componentDidMount () {
    const { refKey } = this.props;
    this.updateImages(refKey);
    
  }


  updateImages = refKey => {
    console.log('updating process images for #' + refKey);
    const series = getImageSeries(refKey);
    if (series) {
      this.setState({
        progressImages: series
      })
    } else {
      console.log('- no images found')
    }
    
  }


  render () {
    const { progressImages } = this.state;
    const { selectLightbox, imageHeight } = this.props;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
      <div className="process-images">
        {progressImages.length === 0 && (
          <h4>No progress images found for this item.</h4>
        )}
        {progressImages.map(imageId => (
          <Image 
            key={imageId}
            title={imageId.split('-').pop()}
            className="responsive thumbnail" 
            publicId={imageId} 
            height={imageHeight}
            onClick={() => selectLightbox(imageId)}
          >
            <Transformation height={imageHeight} crop="thumb" />
            <Transformation defaultImage={defaultCPI} />
          </Image>
        ))}     
      </div>
      </CloudinaryContext>
    )
  }
}

ProgressGallery.propTypes = {
  refKey: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  selectLightbox: PropTypes.func.isRequired
}

ProgressGallery.defaultProps = {
  imageHeight: 80,
  selectLightbox: selectLightboxUtil
}

export default ProgressGallery;
