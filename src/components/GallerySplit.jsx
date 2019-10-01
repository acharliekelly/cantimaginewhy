import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import GalleryNav from './GalleryNav';
import { fetchGallery, variableImageSrc } from '../utils/imageApi';
import '../css/list.css';
import '../css/gallery.scss';

class Gallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pictures: [],
      selectedAlbum: null,
      imageViewOpen: false,
      currentImage: null
    };
  }

  componentDidMount () {
    const { currentAlbum } = this.props;
    if (currentAlbum) {
      console.log('Loaded: ', currentAlbum);
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
      source: variableImageSrc(picture.public_id, 400),
      title: this.getPictureCaption(picture),
      descrip: this.getPictureProperty(picture, 'alt'),
      location: this.getPictureProperty(picture, 'location'),
      medium: this.getPictureProperty(picture, 'medium'),
      size: this.getPictureProperty(picture, 'size'),
      year: this.getPictureProperty(picture, 'year'),
      forSale: (this.getPictureProperty(picture, 'original') === 'available'),
      forPrint: (this.getPictureProperty(picture, 'canvas-id', '-') !== '-'),
      price: (this.getPictureProperty(picture, 'price', 'NFS')),
      canvasId: this.getPictureProperty(picture, 'canvas-id', '-'),
      posterId: this.getPictureProperty(picture, 'poster-id', '-')
    };
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

  closeImageView = () => {
    this.setState({
      imageViewOpen: false,
      currentImage: null
    })
  }
    
  render () {
    const { pictures, selectedAlbum, currentImage } = this.state;
    return (
        <div className="content">
          <CloudinaryContext cloudName="cantimaginewhy">
            
            <GalleryNav 
              handleNavChange={this.updateGallery}
              handleClearGallery={this.clearGallery} 
            />

            <h2 className="gallery-title">{selectedAlbum}</h2>
            <main className="display-area">
              
              <div className="gallery">
                
                {pictures.map(picture => {
                  // set caption
                  const caption = this.getPictureCaption(picture);
                  
                  let orient = picture.height > picture.width ? 'portrait' : 'landsc';
                  if (picture.height === picture.width) {
                    orient = 'square';
                  }
                  return (
                    <div className="responsive thumbnail" key={picture.public_id}>
                      
                      <Image 
                        publicId={picture.public_id} 
                        className={orient}
                        onClick={() => this.openImageView(picture)}
                        >
                          <Transformation
                              crop="fit"
                              height="100"
                              dpr="auto"
                              responsive_placeholder="blank"
                          />
                      </Image>
                      <div className="title">{caption}</div>
                    </div>
                    )
                }) }
              </div>

              {this.state.imageViewOpen && (
                <div className="image-view">
                  <img alt="" src={currentImage.source} onClick={this.closeImageView} />
                  <div className="image-info">
                    <div className="title">{currentImage.title}</div>
                    <div className="info">{currentImage.descrip}</div>
                    <div className="info">{currentImage.size}, {currentImage.medium}</div>
                    {currentImage.forPrint && (
                      <div className="info">
                        <div className="info">Canvas: {currentImage.canvasId}</div>
                      </div>
                    )}
                    {currentImage.forSale && (
                      <div className="info">${currentImage.price}</div>
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

export default Gallery;
