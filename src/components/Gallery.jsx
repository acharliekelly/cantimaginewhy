import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';
// import albumList from '../utils/albums';
import Lightbox from 'react-image-lightbox';
import GalleryNav from './GalleryNav';
import 'react-image-lightbox/style.css'; 
import '../css/list.css';
import '../css/gallery.css';

class Gallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pictures: [],
      selectedAlbum: null
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
    const url = `https://res.cloudinary.com/cantimaginewhy/image/list/${tagName}.json`;
    axios.get(url)
      .then(res => {
        this.setState({
          selectedAlbum: tagName, 
          pictures: res.data.resources,
          lightboxOpen: false,
          currentImage: null
        });
      });
  }

  clearGallery = () => {
    this.setState({
      pictures: [],
      selectedAlbum: null,
      lightboxOpen: false
    })
  }

  openLightbox = pictureId => {
    // console.log('open lightbox for: ' + pictureId);
    this.setState({
      lightboxOpen: true,
      currentImage: `https://res.cloudinary.com/cantimaginewhy/w_1000/w_500,l_ck_logo,o_30/${pictureId}.jpg`
    })
  }

  closeLightbox = () => {
    this.setState({
      lightboxOpen: false
    })
  }
    
  render () {
    const { pictures, selectedAlbum } = this.state;
    return (
        <div className="content">
          <CloudinaryContext cloudName="cantimaginewhy">
            
            <GalleryNav 
              handleNavChange={this.updateGallery}
              handleClearGallery={this.clearGallery} 
            />
            <main>
              <h1 className="gallery-title">{selectedAlbum}</h1>
              <div className="gallery">
                {pictures.map(picture => {
                  // set caption
                  let caption;
                  try {
                    caption = picture.context.custom.caption;
                  } catch (err) {
                    caption = 'Untitled';
                  }
                  
                  let orient = picture.height > picture.width ? 'portrait' : 'landsc';
                  if (picture.height === picture.width) {
                    orient = 'square';
                  }
                  return (
                    <div className="responsive thumbnail" key={picture.public_id}>
                      
                      <Image 
                        cloudName="cantimaginewhy" 
                        publicId={picture.public_id} 
                        className={orient}
                        onClick={() => this.openLightbox(picture.public_id)}
                        >
                          <Transformation
                              crop="fit"
                              height="150"
                              dpr="auto"
                              responsive_placeholder="blank"
                          />
                      </Image>
                      <div className="title">{caption}</div>
                    </div>
                    )
                }) }
              </div>
              
          </main>
          {this.state.lightboxOpen && (
            <Lightbox
              mainSrc={this.state.currentImage}
              onCloseRequest={this.closeLightbox}
            ></Lightbox>
          )}
          </CloudinaryContext>
        </div>

      );
    }
}

export default Gallery;
