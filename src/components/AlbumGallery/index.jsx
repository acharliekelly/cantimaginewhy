import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

import ImageDisplay from '../ImageDisplay/';
// import { fetchAlbum } from '../../utils/advImageApi';
import { fetchAlbum } from '../../utils/imageApi';
import { selectLightboxUtil } from '../../utils/imageUtils';
import { albums } from '../../utils/albums';

import '../FilterNav/filter-nav.scss';
import '../FilteredGallery/filtered-gallery.scss';

class AlbumGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedAlbum: null,
      pictures: [],
      currentIndex: 0,
      currentImage: null
    }
  } 

  componentDidMount () {
    this.updateGallery(albums[0].name)
  }

  updateGallery = albumName => {
    const tmp = fetchAlbum(albumName);

    this.setState({
      selectedAlbum: albumName,
      pictures: tmp,
      currentIndex: 0,
      currentImage: tmp[0]
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
      currentImage: picture,
      currentIndex: index
    });
  }

  // select by index
  openImageIndex = index => {
    const { pictures } = this.state;
    this.setState({
      currentIndex: index,
      currentImage: pictures[index]
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


  render () {
    const { selectLightbox } = this.props;
    const { pictures, currentImage, selectedAlbum } = this.state;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <div className="album-list">
          {albums.map(album => (
            <div key={album.name}
              className={'album-btn' + (album.name === selectedAlbum && ' selected-nav')}
              onClick={() => this.updateGallery(album.name)}
            >
              <Image
                title={album.name}
                publicId={album.thumbnail}
                height={80}
              >
                <Transformation defaultImage="ck-diamond" />
                <Transformation height={80} crop="thumb" />
              </Image>
            </div>
            ))}
        </div>
        <main className="display-area">
          <div className="gallery">
            {pictures.map(picture => {
              let cls = "responsive thumbnail";
              cls += (picture.public_id === currentImage.public_id) ? ' selected' : '';
              return (
                <div key={picture.public_id}>
                  <Image 
                    className={cls}
                    publicId={picture.public_id}
                    height={80}
                    crop="fit"
                    onClick={() => this.openImageView(picture)}
                  >
                    <Transformation defaultImage="ck-diamond" />
                    <Transformation height={100} crop="thumb" />
                  </Image>
                </div>
              )
            })}
          </div>
          {currentImage && (
            <ImageDisplay 
              currentImage={currentImage} 
              movePrevious={this.openPreviousImage}
              moveNext={this.openNextImage}
              selectLightbox={selectLightbox} 
            />
          )}
        </main>


      </CloudinaryContext>
    )
  }
}

AlbumGallery.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
};

AlbumGallery.defaultProps = {
  selectLightbox: selectLightboxUtil
};

export default AlbumGallery;
