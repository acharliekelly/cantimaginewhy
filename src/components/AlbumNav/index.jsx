import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { albums } from '../../utils/albums';

import '../FilterNav/filter-nav.scss';

class AlbumNav extends Component {

  constructor (props) {
    super(props);

    this.state = {
      selectedNav: null
    }
  }

  componentDidMount () {
    
  }

  handleNavClick = nav => {
    // nav is object (album) from album list
    // { name, tag, thumbnail, description }
    this.setState({
      selectedNav: nav
    });

    this.props.handleNavChange(nav.tag);
  }

  render () {
    const { selectedNav } = this.state;
    
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        
        <div className="album-list">
          {albums.map(album => {
              let cls = 'album-btn responsive thumbnail';
              if (selectedNav && selectedNav.tag === album.tag) {
                cls += ' selected-nav'
              }
              return (
                <div key={album.tag} id={album.tag} className={cls} onClick={() => this.handleNavClick(album)}>
                    <Image  
                        publicId={`${album.thumbnail}`}
                        dpr="auto"
                        responsive
                        height="100"
                        crop="fit"
                    >
                        <Transformation defaultImage={defaultImg} />
                    </Image>
                    <div className="album-name">{album.name}</div>
                </div>
              );
            })}
          </div>
        {selectedNav && (
          <div className="current-nav">
            <div className="nav-title">{selectedNav.name}</div>
            <div className="nav-description">{selectedNav.description}</div>
          </div>
        )}
      </CloudinaryContext>
    );
  }
}

AlbumNav.propTypes = {
  handleNavChange: PropTypes.func.isRequired,
  handleClearGallery: PropTypes.func
};

export default AlbumNav;
