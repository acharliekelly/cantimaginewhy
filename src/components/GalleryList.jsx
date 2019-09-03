import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import albumList from '../utils/albums';
import './list.css';

class GalleryList extends Component {

  handleAlbumSelect = event => {
    const tagName = event.target.id;
    this.props.updateGallery(tagName);

  }

  render () {
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <header className="album-list">
          <h2>Select Gallery</h2>
          {albumList.albums.map(album => {
            /* Takes data from src/utils/albums.js to generate album list */
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
        </header>
      </CloudinaryContext>
    );
  }
}

export default GalleryList;
