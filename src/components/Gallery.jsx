import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';
import albumList from '../utils/albums';
import './list.css';
import './gallery.css';

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
          pictures: res.data.resources
        });
      });
  }
    
  render () {
    const { pictures, selectedAlbum } = this.state;
    return (
        <CloudinaryContext cloudName="cantimaginewhy">
          <header>
            <h2 className="list-title">Select Gallery</h2>
            <div className="album-list">
              {albumList.albums.map(album => (
                    <div key={album.tag} className="album-btn" onClick={this.handleAlbumSelect}>
                        <Image  
                            id={album.tag}
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
                  )) }
              </div>
          </header>
          <main>
            <h1 className="gallery-title">{selectedAlbum}</h1>
            <div className="gallery">
              {pictures.map(picture => {
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
              }) }
            </div>
        </main>
        </CloudinaryContext>
      );
    }
}

export default Gallery;
