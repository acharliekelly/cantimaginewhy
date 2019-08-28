import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';
import albumList from '../utils/albums';

class Gallery extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
      pictures: [],
      selectedAlbum: null
    };
  }

  componentDidMount () {
    if (this.props.currentAlbum) {
      this.getTaggedPictures(this.props.currentAlbum);
    }
    
  }

  getTaggedPictures = tagName => {
    // load images
    axios.get(`https://res.cloudinary.com/cantimaginewhy/image/list/${tagName}.json`)
      .then(res => {
        this.setState({
          selectedAlbum: tagName, 
          pictures: res.data.resources,
          isLoaded: true
        });
      });
  }

  handleAlbumSelect = event => {
    const tagName = event.target.id
    this.getTaggedPictures(tagName);

  }

  render () {
    const { isLoaded, pictures } = this.state;
    if (!isLoaded) {
      this.getTaggedPictures(this.props.currentAlbum);
      return 'Loading...';
    } else {
      return (
        <div className="main">
          <div className="album-list">
              <h2>Select Album</h2>
              {/* Takes data from src/config/albums.js to generate album list */}
              {albumList.albums.map(album => {
                  return (
                      <div key={album.tag} id={album.tag} className="album-btn" onClick={this.handleAlbumSelect}>
                          <Image  
                              publicId={`art/${album.thumbnail}`}
                              className="thumbnail inline"
                              width="150"
                              height="150"
                              crop="fit"
                              quality="80"
                          >
                              <Transformation quality="auto" fetchFormat="auto" />
                          </Image>
                          <h3 className="album-name">{album.name}</h3>
                      </div>
                  );
              })}
              </div>
            <h1>Gallery</h1>
            <div className="gallery">
                <CloudinaryContext cloudName="cantimaginewhy">
                    {
                        pictures.map(picture => {
                            return (
                                <div className="responsive" key={picture.public_id}>
                                    <div className="img">
                                        <a 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          href={`https://res.cloudinary.com/cantimaginewhy/${picture.public_id}.jpg`}>
                                            <Image publicId={picture.public_id}>
                                                <Transformation
                                                    crop="scale"
                                                    width="300"
                                                    height="200"
                                                    dpr="auto"
                                                    responsive_placeholder="blank"
                                                />
                                            </Image>
                                        </a>
                                        <div className="title">{picture.context.custom.caption}</div>
                                    </div>
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

export default Gallery;
