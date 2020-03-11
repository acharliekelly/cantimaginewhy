import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { fetchGallery, defaultCPI, getContextProperty } from '../../utils/imageApi';

class SimpleGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount () {
    const { tagName, gallerySize } = this.props;
    this.updateImages(tagName, gallerySize);
  }
  

  componentDidUpdate (prevProps, prevState) {
    const { tagName, gallerySize } = this.props;
    if (prevProps.tagName !== tagName) {
      // tagName changed
      this.onTagChange(tagName);
    }
    if (prevProps.gallerySize !== gallerySize) {
      // gallerySize changed
      this.onGallerySizeChange(gallerySize)
    }
  }


  // fetch images with tagName
  updateImages = (tagName, gallerySize) => {
    fetchGallery(tagName)
      .then(res => {
        let arr = res.data.resources;
        this.shuffleImages(arr);
        this.setState({
          images: arr.slice(0, gallerySize)
        })
      });
  }

  // update Gallery Size
  onGallerySizeChange = newSize => {
    const { tagName } = this.props;
    this.updateImages(tagName, newSize);
  }

  // update Tag Name
  onTagChange = newTag => {
    const { gallerySize } = this.props;
    this.updateImages(newTag, gallerySize);
  }

  // randomize current image set
  shuffleImages = array => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  zoomImage = imageId => {
    const { selectLightbox } = this.props;
    const { images } = this.state;
    const idx = images.findIndex(img => img.public_id === imageId);
    selectLightbox(imageId, images, idx);
  }
  

  render () {
    const { images } = this.state;
    const { imageHeight } = this.props;
    return (
      <div className="gallery-wrapper">
        <div className="basic-gallery">
            {images.map(image => (
              <Image 
                key={image.publid_id} 
                title={getContextProperty(image, 'caption', 'Untitled')}
                responsive 
                height={imageHeight}
                crop="fit" 
                cloudName="cantimaginewhy" 
                publicId={image.public_id}
                onClick={() => this.zoomImage(image.public_id)}
              >
                <Transformation defaultImage={defaultCPI} />
              </Image>
            ))}
          </div>
        </div>
    );
  }
}

SimpleGallery.propTypes = {
  tagName: PropTypes.string.isRequired,
  gallerySize: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  selectLightbox: PropTypes.func.isRequired,
  imageList: PropTypes.array
};

SimpleGallery.defaultProps = {
  tagName: 'favorite',
  gallerySize: 4,
  imageHeight: 200
};

export default SimpleGallery;
