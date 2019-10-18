import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { variableImageSrc } from '../utils/imageApi';

class ImageDisplay extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      source: '',
      title: 'Untitled',
      description: '',
      location: '',
      medium: null,
      size: null,
      year: '',
      forSale: false,
      forPrint: false,
      price: null,
      canvasId: null,
      posterId: null,
      materialInfo: false
    }
  }

  componentDidMount () {
    this.refreshImageProperties();
  }

  refreshImageProperties = () => {
    const picture = this.props.currentImage;
    this.setState({
      source: variableImageSrc(picture.public_id, 400),
      title: this.getPictureCaption(picture),
      description: this.getPictureProperty(picture, 'alt'),
      location: this.getPictureProperty(picture, 'location'),
      medium: this.getPictureProperty(picture, 'medium'),
      size: this.getPictureProperty(picture, 'size'),
      year: this.getPictureProperty(picture, 'year'),
      forSale: (this.getPictureProperty(picture, 'original') === 'available'),
      forPrint: (this.hasProperty('canvas-id') || this.hasProperty('poster-id')),
      price: (this.getPictureProperty(picture, 'price', 'NFS')),
      canvasId: this.getPictureProperty(picture, 'canvas-id', '-'),
      posterId: this.getPictureProperty(picture, 'poster-id', '-'),
      materialInfo: this.hasProperty('medium') && this.hasProperty('size')
    })
  }

  getPictureCaption = pictureObj => {
    return this.getPictureProperty(pictureObj, 'caption', 'Untitled');
  }

  getPictureProperty = (pictureObj, property, errValue = '') => {
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
    let val = false;
    try {
      val = (pictureObj.context.custom[propertyName] != null)
    } catch (err) {
      return false;
    }
    return val;
  }

  handleBuyPrint = () => {
    const canvasId = this.state.canvasId;
    this.props.purchaseCanvas(canvasId);
  }

  handleBuyPoster = () => {
    const { posterId } = this.state;
    this.props.purchasePoster(posterId);
  }

  handleBuyOriginal = () => {
    const id = this.props.currentImage.public_id;
    this.props.purchaseOriginal(id);
  }

  render () {
    
    return (
      <div className="image-view">
        <img alt="" src={this.state.source} onClick={this.props.closeImageView} />
        <div className="image-info">
          <div className="title">{this.state.title}</div>
          <div className="info">{this.state.description}</div>
          {this.state.materialInfo && (
            <div className="info">{this.state.size}, {this.state.medium}</div>
          )}
          {this.state.forSale && (
            <div className="options">
              <span className="label">Buy Original:</span>
              <span className="purchase buy-orig" 
              onClick={this.handleBuyOriginal}>${this.state.price}</span>
            </div>
          )}
          {this.state.forPrint && (
            <div className="options">
              <span className="label">Buy Print:</span>
              <span 
                className="purchase buy-print" 
                onClick={this.handleBuyPoster}
              >Poster</span>
              <span 
                className="purchase buy-print"
                onClick={this.handleBuyPrint}  
              >Canvas</span>
            </div>
          )}
          
        </div>
        
      </div>
    );
  }
  
}

ImageDisplay.propTypes = {
  currentImage: PropTypes.object.isRequired,
  closeImageView: PropTypes.func.isRequired,
  purchasePoster: PropTypes.func,
  purchaseCanvas: PropTypes.func,
  purchaseOriginal: PropTypes.func
}

export default ImageDisplay;
