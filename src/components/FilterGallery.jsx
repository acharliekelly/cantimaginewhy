import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext } from 'cloudinary-react';

import '../css/gallery.scss';

class FilteredGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
  }

  componentDidMount () {
    const { currentAlbum } = this.props;
    if (currentAlbum) {
      this.props.updateGallery(currentAlbum);
    }
  }

  // select an image
  openImageView = picture => {
    const index = this.props.imageList.findIndex(img => img.public_id === picture.public_id);
    this.setState({
      currentIndex: index
    })
    this.props.updateImage(index);
  }
  
  render () {
    const { currentIndex } = this.state;
    const { imageList } = this.props;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">

        <main className="display-area">
          
          <div className="gallery">
            
            {imageList && imageList.map(picture => {
              let cls = 'responsive thumbnail';
              if (picture.public_id === imageList[currentIndex].public_id) {
                cls += ' selected'
              }
              return (
                <div 
                  className={cls}
                  key={picture.public_id} 
                >
                  {/* thumbnail gallery */}
                  <Image 
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

        </main>
      </CloudinaryContext>

    );
  }
}

FilteredGallery.propTypes = {
  currentAlbum: PropTypes.string,
  updateImage: PropTypes.func
};

export default FilteredGallery;
