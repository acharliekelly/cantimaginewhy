import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';
import './gallery.css';

class StaticGallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
      pictures: []
    };
  }

  componentDidMount () {
    const { pictures } = this.state;
    if (pictures.length < 1) {
      this.loadPictures(this.props.currentAlbum);
    }
    
  }

  loadPictures = albumName => {
    // load images
    
    const url = `https://res.cloudinary.com/cantimaginewhy/image/list/${albumName}.json`;
    axios.get(url)
      .then(res => {
        this.setState({
          pictures: res.data.resources,
          isLoaded: true
        });
      });
  }

  render () {
    const { isLoaded, pictures } = this.state;
    if (!isLoaded) {
      this.loadPictures(this.props.currentAlbum);
      return 'Loading...';
    } else {
      return (
        <div className="main">
          <h1 className="gallery-title">{this.props.currentAlbum}</h1>
          <div className="gallery">
            <CloudinaryContext cloudName="cantimaginewhy">
                {
                    pictures.map(picture => {
                      let caption = 'Untitled';
                      if (picture.context && picture.context.custom && picture.context.custom.caption) {
                        caption = picture.context.custom.caption;
                      }
                      return (
                          <div className="responsive img" key={picture.public_id}>
                              <a 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                href={`https://res.cloudinary.com/cantimaginewhy/${picture.public_id}.jpg`}>
                                  <Image cloudName="cantimaginewhy" publicId={picture.public_id}>
                                      <Transformation
                                          crop="scale"
                                          width="300"
                                          height="200"
                                          dpr="auto"
                                          responsive_placeholder="blank"
                                      />
                                  </Image>
                              </a>
                              <div className="title">{caption}</div>
                          </div>
                      )
                    })
                }
              </CloudinaryContext>
              <div className="clearfix"></div>
          </div>
        </div>

    );
    }
    
  }

}

export default StaticGallery;
