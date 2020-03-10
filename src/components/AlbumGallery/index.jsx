import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

import ImageDisplay from '../ImageDisplay/';
// import { fetchAlbum } from '../../utils/advImageApi';
import { fetchGallery, defaultImg } from '../../utils/imageApi';
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
    // load images
    fetchGallery(albumName)
      .then(res => {
        this.setState({
          selectedAlbum: albumName, 
          pictures: res.data.resources,
          currentIndex: 0,
          currentImage: res.data.resources[0]
        });
      });
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
    const { pictures, currentIndex } = this.state;
    const nextIndex = (currentIndex + 1) % pictures.length;
    this.openImageIndex(nextIndex);
  }

  openPreviousImage = () => {
    const { pictures, currentIndex } = this.state;
    const prevIndex = (currentIndex + pictures.length - 1) % pictures.length;
    this.openImageIndex(prevIndex);
  }


  render () {
    const { selectLightbox } = this.props;
    const { pictures, currentImage, selectedAlbum } = this.state;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <div className="album-list">
          {albums.map(album => {
            let cls = 'album-btn responsive thumbnail';
            if (selectedAlbum === album.name) {
              cls += ' selected-nav';
            }
            return (
              <div key={album.tag}
                className={cls}
                onClick={() => this.updateGallery(album.tag)}
              >
                <Image
                  title={album.name}
                  publicId={album.thumbnail}
                >
                  <Transformation defaultImage={defaultImg} />
                  <Transformation height={100} crop="fit" />
                </Image>
                <div className="album-name">{album.name}</div>
              </div>
            )
            
            })}
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
                    <Transformation defaultImage={defaultImg} />
                    <Transformation height={100} crop="fit" />
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
              imageList={pictures}
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
