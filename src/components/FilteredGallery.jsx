import React, { Component } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import Lightbox from 'react-image-lightbox';
import FilterNav from './FilterNav';
import { fetchGallery, variableImageSrc, watermarkedImageSrc } from '../utils/imageApi';

import 'react-image-lightbox/style.css';
import '../css/gallery.scss';

class FilteredGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pictures: [],
      selectedAlbum: null,
      imageViewOpen: false,
      currentImage: null,
      lightboxOpen: false
    };
  }

  componentDidMount () {
    const { currentAlbum } = this.props;
    if (currentAlbum) {
      this.updateGallery(currentAlbum);
    }
    
  }

  handleAlbumSelect = event => {
    const tagName = event.target.id;
    console.log('Selected album: ', tagName);
    this.updateGallery(tagName);
  }

  updateGallery = tagName => {
    // load images
    fetchGallery(tagName)
      .then(res => {
        this.setState({
          selectedAlbum: tagName, 
          pictures: res.data.resources,
          imageViewOpen: false,
          currentImage: null
        });
      });
  }

  clearGallery = () => {
    this.setState({
      pictures: [],
      selectedAlbum: null,
      imageViewOpen: false,
      currentImage: null
    })
  }

  openImageView = picture => {
    const img = {
      publicId: picture.public_id,
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
      materialInfo: this.hasProperty('medium') && this.hasProperty('size')
    }
    this.setState({
      imageViewOpen: true,
      currentImage: img
    });
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

  

  closeImageView = () => {
    this.setState({
      imageViewOpen: false,
      currentImage: null
    })
  }

  openLightbox = () => {
    this.setState({
      lightboxOpen: true
    })
  }

  closeLightbox = () => {
    this.setState({
      lightboxOpen: false
    })
  }
    
  render () {
    const { pictures, currentImage, imageViewOpen, lightboxOpen } = this.state;
    return (
        <div className="content">
          <CloudinaryContext cloudName="cantimaginewhy">
            
            <FilterNav 
              handleNavChange={this.updateGallery}
              handleClearGallery={this.clearGallery} 
            />

            <main className="display-area">
              
              <div className="gallery">
                
                {pictures.map(picture => {
                  return (
                    <div 
                      className="responsive thumbnail" 
                      key={picture.public_id} 
                    >
                      
                      <Image 
                        publicId={picture.public_id}
                        height="100"
                        crop="fit"
                        onClick={() => this.openImageView(picture)}
                      />
                    </div>
                    )
                }) }
              </div>

              {lightboxOpen && (
                <Lightbox 
                  mainSrc={watermarkedImageSrc(currentImage.publicId)}
                  onCloseRequest={this.closeLightbox}
                />
              )}

              {imageViewOpen && (
                <div className="image-view">
                  <img className="display-image" alt="" src={currentImage.source} onClick={this.openLightbox} />
                  <div className="image-info">
                    <div className="title">{currentImage.title}</div>
                    <div className="info">{currentImage.description}</div>
                    {currentImage.materialInfo && (
                      <div className="info">{currentImage.size}, {currentImage.medium}</div>
                    )}
                    {currentImage.forSale && (
                      <div className="options">
                        <span className="label">Buy Original:</span>
                        <span className="purchase buy-orig">${currentImage.price}</span>
                      </div>
                    )}
                    {currentImage.forPrint && (
                      <div className="options">
                        <span className="label">Buy Print:</span>
                        <span 
                          className="purchase buy-print" 
                          onClick={() => console.log('Buy Poster #' + currentImage.posterId)}
                        >Poster</span>
                      </div>
                    )}
                    
                  </div>
                  
                </div>
              )}
              
            </main>
          </CloudinaryContext>
        </div>

      );
    }
}

export default FilteredGallery;
