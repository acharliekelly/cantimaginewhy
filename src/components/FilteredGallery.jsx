import React, { Component } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import Collapse from 'react-bootstrap/Collapse';
import FilterNav from './FilterNav';
import ImageDisplay from './ImageDisplay';
import { fetchGallery } from '../utils/imageApi';

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
    // console.log('opening image: ' + picture.public_id);
    this.setState({
      imageViewOpen: true,
      currentImage: picture
    });
  }

  

  

  closeImageView = () => {
    this.setState({
      imageViewOpen: false,
      currentImage: null
    })
  }

  purchaseItem = (purchaseType, id) => {
    console.log('Purchse ' + purchaseType + ': ' + id);
  }
    
  render () {
    const { pictures, currentImage, imageViewOpen } = this.state;
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

              <Collapse in={imageViewOpen} dimension="width">
                <div style={{ width: 500 }}>
                  { currentImage && (
                    <ImageDisplay 
                      currentImage={currentImage}
                      closeImageView={this.closeImageView}
                      purchaseItem={this.purchaseItem}
                    />
                  )}
                </div>
                
              </Collapse>
              
            </main>
          </CloudinaryContext>
        </div>

      );
    }
}

export default FilteredGallery;
