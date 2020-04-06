import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageDisplay from '../ImageDisplay/';
import { fetchGallery, defaultImg, sortGallery } from '/utils/imageApi';
import { selectLightboxUtil } from '/utils/miscUtils';

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
    const { currentAlbum, isGalleryEmpty } = this.props;
    try {
      if (currentAlbum && prevProps.currentAlbum && prevProps.currentAlbum.tag !== currentAlbum.tag) {
        // if currentAlbum changed, update
        this.updateGallery(currentAlbum);
      } else if (currentAlbum && !prevProps.currentAlbum) {
        // if first click, no prevProps
        this.updateGallery(currentAlbum);
      }
      if (isGalleryEmpty !== prevProps.isGalleryEmpty) {
        if (isGalleryEmpty) this.clearGallery();
      }
    } catch(err) {
      console.error(err);
    }
    
  }

  /**
   * takes NavObject from albums or filters
   * { name, tag, thumbnail, description, sortField }
   */
  updateGallery = navObj => {
    
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

  render () {
    const { pictures, currentIndex } = this.state;
    const currentImage = pictures[currentIndex];
    const { isGalleryEmpty } = this.props;

    return (
        
        <CloudinaryContext cloudName="cantimaginewhy">
          {!isGalleryEmpty && ( 
          <Container className="display-area">
            <Row>
              <Col md={5} className="gallery">
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
              </Col>
              <Col md={7}>
                {currentImage && (
                <ImageDisplay 
                    currentImage={currentImage}
                    movePrevious={this.previousImage}
                    moveNext={this.nextImage}
                    selectLightbox={this.props.selectLightbox}
                    imageList={pictures}
                  />
                )}
              </Col>
            </Row>
            </Container>
          )} 
        </CloudinaryContext>


      );
    }
}

ImageGallery.propTypes = {
  /**
   * no gallery is selected
   */
  isGalleryEmpty: PropTypes.bool,
  /**
   * Lightbox function
   */
  selectLightbox: PropTypes.func.isRequired,
  /**
   * the nav object to filter on (must be obj, not string)
   */
  currentAlbum: PropTypes.object,
}

ImageGallery.defaultProps = {
  selectLightbox: selectLightboxUtil,
  isGalleryEmpty: true
}

export default ImageGallery;
