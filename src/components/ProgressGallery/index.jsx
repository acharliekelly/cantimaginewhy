import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { onsitePhotos } from '../../utils/onsiteUtils';
// import { fetchProcessImages } from '../../utils/advImageApi';
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

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.refKey !== this.props.refKey) {
      this.updateImages(this.props.refKey);
    }
  }


  updateImages = refKey => {
    // console.log('updating process images for #' + refKey);
    onsitePhotos(refKey)
      .then(resources => {
        this.setState({
          progressImages: resources
        })
      })
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
        {progressImages.map(image => (
          <Image 
            key={image.public_id}
            title={image.context.custom.caption || image.public_id.split('-').pop()}
            className="responsive thumbnail" 
            publicId={image.public_id} 
            height={imageHeight}
            onClick={() => selectLightbox(image.public_id)}
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
  refKey: 'missing_key',
  imageHeight: 80,
  selectLightbox: selectLightboxUtil
}

export default ProgressGallery;
