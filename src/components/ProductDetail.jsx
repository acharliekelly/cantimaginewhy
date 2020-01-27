import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
// import { variableImageSrc } from '../utils/imageApi';

import '../css/detail.scss';

class ProductDetail extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      lightboxOpen: false
    }
  }

  loadImageProperties = () => {
    const infoObj = {
      id: this.props.currentImage.public_id,
      title: this.getPictureCaption(),
      description: this.getPictureProperty('alt'),
      location: this.getPictureProperty('location'),
      medium: this.getPictureProperty('medium'),
      size: this.getPictureProperty('size'),
      year: this.getPictureProperty('year'),
      forSale: (this.getPictureProperty('original') === 'available'),
      price: this.getPictureProperty('price', 'NFS'),
      materialInfo: this.hasProperty('medium') && this.hasProperty('size'),
    }
    return infoObj;
  }

  getPictureCaption = () => {
    return this.getPictureProperty('caption', 'Untitled');
  }

  getPictureProperty = (property, errValue = '') => {
    const pictureObj = this.props.currentImage;
    let val;
    try {
      val = pictureObj.context.custom[property];
    } catch (err) {
      val = errValue;
    }
    return val;
  }

  hasProperty = propertyName => {
    const pictureObj = this.props.currentImage;
    if (pictureObj.hasOwnProperty('context')) {
      return pictureObj.context.custom.hasOwnProperty(propertyName);
    } else {
      return false;
    }
  }

  



  render () {
    const { currentImage } = this.props;
    if (currentImage) {
      const info = this.loadImageProperties();
      return (
        <div className="image-view">
          <Image 
            cloudName="cantimaginewhy"
            publicId={info.id}
            className="display-image" 
            dpr="auto"
            responsive
            width="auto"
            crop="scale"
          />
          <img className="display-image" alt="" src={info.source} />
          <div className="image-info">
            <div className="title">{info.title}</div>
            <div className="info">{info.description}</div>
            <div className="info">
              <span className="label">Location: </span>
              <span className="data">{info.location}</span>
            </div>
            <div className="info">
              <span className="label">Year: </span>
              <span className="data">{info.year}</span>
            </div>
            <div className="info">
              <span className="label">Material: </span>
              <span className="data">{info.size}, {info.medium}</span>
            </div>
            <div className="options">
              <h3>Options</h3>
              <div className="todo">options</div>
              <h3>Purchase Options</h3>
              <div className="todo">purchase options</div>
              
            </div>

            
          </div>
          
        </div>

      );
    } else {
      return (<div />)
    }
    
    
  }
  
}

ProductDetail.propTypes = {
  currentImage: PropTypes.object.isRequired,
  closeImageView: PropTypes.func.isRequired,
  purchaseItem: PropTypes.func
}

export default ProductDetail;
