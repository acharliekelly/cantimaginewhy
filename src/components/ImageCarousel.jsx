import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import Coverflow from 'react-coverflow';
import { fetchGallery } from '../utils/imageApi';



class ImageCarousel extends Component {

  constructor () {
    super();
    this.state = {
      isLoaded: false,
      pictures: []
    }
  }

  componentDidMount () {
    const { tagName } = this.props;
    this.updateImages(tagName);
  }

  updateImages = tagName => {
    fetchGallery(tagName)
      .then(res => {
        this.setState({
          pictures: res.data.resources,
          isLoaded: true
        })
      });
  }

  handleClickImage = img => {
    this.props.selectImage(img);
  }

  render () {
    const { pictures, isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <h2 className="loading">Loading...</h2>
      )
    } else {
      return (
        <Coverflow
          width={1080}
          height={480}
          displayQuantityOfSide={1}
          navigation={true}
          infiniteScroll={true}
          enableHeading={true}
          media={{
            '@media (max-width: 900px)': {
              width: '600px',
              height: '300px'
            },
            '@media (min-width: 900px)': {
              width: '960px',
              height: '600px'
            }
          }}
        >
          {pictures.map(pic => (
            <Image 
              cloudName="cantimaginewhy" 
              publicId={pic.public_id}
              crop="fit" 
              height="400"
              alt={pic.context.custom.caption}
              onClick={() => {this.handleClickImage(pic)}}
            />
          ))}
        </Coverflow>
      );
    }
    
  }

}

export default ImageCarousel;
