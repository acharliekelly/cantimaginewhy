import React, { Component } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';

import FilterNav from '../FilterNav/';
import ImageDisplay from '../ImageDisplay/';
import { fetchGallery } from '../../utils/imageApi';

import './filtered-gallery.scss';

class FilteredGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pictures: [],
      currentIndex: 0,
      selectedAlbum: null,
      imageViewOpen: false,
      currentImage: null
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
    this.updateGallery(tagName);
  }

  updateGallery = tagName => {
    // load images
    fetchGallery(tagName)
      .then(res => {
        this.setState({
          selectedAlbum: tagName, 
          pictures: res.data.resources,
          imageViewOpen: true,
          currentIndex: 0,
          currentImage: res.data.resources[0]
        });
      });
  }

  // de-select all images and albums
  clearGallery = () => {
    this.setState({
      pictures: [],
      currentIndex: 0,
      selectedAlbum: null,
      imageViewOpen: false,
      currentImage: null
    })
  }

  // this is idiotic
  findIndex = image => {
    const { pictures } = this.state;
    return pictures.findIndex(picture => picture.public_id === image.public_id);
  }

  // select an image
  openImageView = picture => {
    const index = this.findIndex(picture);
    this.setState({
      imageViewOpen: true,
      currentImage: picture,
      currentIndex: index
    });
  }
  

  closeImageView = () => {
    this.setState({
      imageViewOpen: false,
      currentImage: null
    })
  }

  // select by index
  openImageIndex = index => {
    const { pictures } = this.state;
    this.setState({
      currentIndex: index,
      currentImage: pictures[index],
      imageViewOpen: true
    });
  }

  openFirstImage = () => {
    const { pictures } = this.state;
    if (pictures.length > 0) {
      this.setState({
        currentIndex: 0,
        currentImage: pictures[0]
      })
    }
  }

  openNextImage = () => {
    const { pictures } = this.state;
    let index = this.state.currentIndex;
    if (index < pictures.length - 1) {
      index++;
    } else {
      index = 0;
    }
    this.openImageIndex(index);
  }

  openPreviousImage = () => {
    const { pictures } = this.state;
    let index = this.state.currentIndex;
    if (index > 0) {
      index--;
    } else {
      index = pictures.length - 1;
    }
    this.openImageIndex(index);
  }

  purchaseItem = (purchaseType, id) => {
    console.log('Purchse ' + purchaseType + ': ' + id);
  }
    
  render () {
    const { pictures, currentImage } = this.state;
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
                  let cls = 'responsive thumbnail';
                  if (picture.public_id === this.state.currentImage.public_id) {
                    cls += ' selected'
                  }
                  return (
                    <div key={picture.public_id} >
                      <Image 
                        className={cls}
                        publicId={picture.public_id}
                        height="80"
                        crop="fit"
                        onClick={() => {
                          this.openImageView(picture)
                          }
                        }
                      />
                    </div>
                    )
                }) }
              </div>

              { currentImage && (
              
                  <ImageDisplay 
                    currentImage={currentImage}
                    movePrevious={this.openPreviousImage}
                    moveNext={this.openNextImage}
                  />
              )}
            </main>
          </CloudinaryContext>
        </div>

      );
    }
}

export default FilteredGallery;
