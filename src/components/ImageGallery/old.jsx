import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

import FilterNav from '../FilterNav/';
import AlbumNav from '../AlbumNav/';
import ImageDisplay from '../ImageDisplay/';
import { fetchGallery, defaultImg, sortGallery } from '../../utils/imageApi';
import { selectLightboxUtil } from '../../utils/imageUtils';

import './gallery.scss';

class ImageGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedAlbum: null,
      pictures: [],
      currentIndex: 0
    };
  }

  componentDidMount () {
    const { currentAlbum } = this.props;
    if (currentAlbum) {
      this.updateGallery(currentAlbum);
    } else {
      this.clearGallery();
    }
    
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.galleryType !== this.props.galleryType) {
      this.clearGallery()
    }
  }


  /**
   * takes NavObject from albums or filters
   * { name, tag, thumbnail, description, sortField }
   */
  updateGallery = navObj => {
    console.log('updating gallery from ' + navObj.name)
    // load images
    fetchGallery(navObj.tag)
      .then(res => {
        const sorted = sortGallery(navObj, res.data.resources);
        this.setState({
          selectedAlbum: navObj.tag, 
          pictures: sorted,
          currentIndex: 0
        });
      });
  }

  // de-select all images and albums
  clearGallery = () => {
    this.setState({
      pictures: [],
      currentIndex: 0,
      selectedAlbum: null
    })
  }

  // select by index
  openImage = index => {
    this.setState({
      currentIndex: index
    });
  }

  firstImage = () => {
    const { pictures } = this.state;
    if (pictures.length > 0) {
      this.setState({
        currentIndex: 0
      })
    }
  }

  nextImage = () => {
    const { pictures, currentIndex } = this.state;
    const next = (currentIndex + 1) % pictures.length;
    this.setState({
      currentIndex: next
    })
  }

  previousImage = () => {
    const { pictures, currentIndex } = this.state;
    const prev = (currentIndex + pictures.length - 1) % pictures.length;
    this.setState({
      currentIndex: prev
    })
  }

  galleryNav = type => {
    if (type === 1) {
      return <AlbumNav updateSelectNav={this.updateGallery} updateClearGallery={this.clearGallery} />
    } else {
      return <FilterNav updateSelectNav={this.updateGallery} updateClearGallery={this.clearGallery} />
    }
  }
    
  render () {
    const { pictures, currentIndex } = this.state;
    const currentImage = pictures[currentIndex];
    const { galleryType } = this.props;

    return (
        
        <CloudinaryContext cloudName="cantimaginewhy">
          
          {this.galleryNav(galleryType)}
          

          <main className="display-area">
            
            <div className="gallery">
              
              {pictures.map((picture, index) => {
                let cls = 'responsive thumbnail';
                if (picture.public_id === currentImage.public_id) {
                  cls += ' selected'
                }
                return (
                  <div key={picture.public_id} >
                    <Image 
                      className={cls}
                      publicId={picture.public_id}
                      onClick={() => this.openImage(index)}
                    >
                      <Transformation height="100" width="100" crop="fill" />
                      <Transformation defaultImage={defaultImg} />
                    </Image>
                  </div>
                  )
              }) }
            </div>

            { currentImage && (
            
                <ImageDisplay 
                  currentImage={currentImage}
                  movePrevious={this.previousImage}
                  moveNext={this.nextImage}
                  selectLightbox={this.props.selectLightbox}
                  imageList={pictures}
                />
            )}
          </main>
        </CloudinaryContext>


      );
    }
}

ImageGallery.propTypes = {
  /**
   * 0 (filter) or 1 (album)
   */
  galleryType: PropTypes.number.isRequired,
  /**
   * Lightbox function
   */
  selectLightbox: PropTypes.func.isRequired,
  /**
   * the tag name to filter on
   */
  currentAlbum: PropTypes.string,
  
}

ImageGallery.defaultProps = {
  galleryType: 0,
  selectLightbox: selectLightboxUtil
}

export default ImageGallery;
