import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { onsitePhotos } from '../../utils/onsiteUtils';
import { selectLightboxUtil } from '../../utils/imageUtils';
import { defaultCPI } from '../../utils/imageApi';
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
    onsitePhotos(refKey)
      .then(resources => {
        this.setState({
          progressImages: resources
        })
      })
  }


  render () {
    const { progressImages } = this.state;
    const { selectImage, imageHeight } = this.props;
    if (progressImages.length > 0) {
      return (
        <CloudinaryContext cloudName="cantimaginewhy">
        <div className="process-images">
          <div className="process-label">
            <span className="label">View Artistic Process</span>
          </div>
          {progressImages.map(image => (
            <Image 
              key={image.public_id}
              title={image.context.custom.caption || image.public_id.split('-').pop()}
              responsive
              publicId={image.public_id} 
              height={imageHeight}
              onClick={() => selectImage(image.public_id)}
            >
              <Transformation height={imageHeight} crop="fill" />
              <Transformation defaultImage={defaultCPI} />
            </Image>
          ))}     
        </div>
        </CloudinaryContext>
      )
    } else {
      return <div className="no-progress" />
    }
    
  }
}

ProgressGallery.propTypes = {
  refKey: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  selectImage: PropTypes.func.isRequired
}

ProgressGallery.defaultProps = {
  refKey: 'missing_key',
  imageHeight: 80,
  selectImage: selectLightboxUtil
}

export default ProgressGallery;
