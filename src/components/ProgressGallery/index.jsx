import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
// import { 
//   onsiteViewImages, 
//   onsiteProgressImages, 
//   onsiteFinalImage, 
//   ImageProcessTypes,
//   getRef
// } from '../../utils/processImages';
import { getSeries } from '../../utils/processUtils';


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
    const series = getSeries(refKey);
    if (series) {
      this.setState({
        progressImages: series
      })
    } else {
      console.log('- no images found')
    }
    
  }


  handleImageClick = ev => {
    // TODO: expand images
  }

  render () {
    const { progressImages } = this.state;
    const { selectLightbox, imageHeight } = this.props;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
      <div className="process-images">
          {progressImages.map(imageId => (
            <Image 
              key={imageId}
              title={imageId}
              className="responsive thumbnail" 
              publicId={imageId} 
              height={imageHeight || 80}
              onClick={() => { 
                if (selectLightbox) {
                  selectLightbox(imageId);
                } else {
                  console.log(imageId + ' clicked');
                }
              }}
            >
              <Transformation defaultImage="ck-diamond.jpg" />
            </Image>
          ))}     
      </div>
      </CloudinaryContext>
    )
  }
}

ProgressGallery.propTypes = {
  refKey: PropTypes.string.isRequired,
  imageHeight: PropTypes.number,
  selectLightbox: PropTypes.func
}

export default ProgressGallery;
