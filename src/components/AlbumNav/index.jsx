import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Nav from 'react-bootstrap/Nav';
import { defaultImg } from '../../utils/imageApi';
import { albumGroups } from '../../utils/albums';

import './nav.scss';

class AlbumNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groupIndex: 0,
      navAlbums: [],
      selectedNav: null
    }
  }

  componentDidMount () {
    this.groupSelect(0);

  }

  navClick = nav => {
    // nav is object (album) from album list
    // { name, tag, thumbnail, description, sortField }
    this.setState({
      selectedNav: nav
    })
    this.props.handleNavChange(nav);
  }

  groupSelect = eventKey => {
    this.props.handleClearGallery();
    this.setState({
      groupIndex: eventKey,
      navAlbums: albumGroups[eventKey].albums,
      selectedNav: null
    })
    
  }

  render () {
    const { navAlbums, groupIndex, selectedNav } = this.state;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <Nav 
            variant="pills" 
            defaultActiveKey={groupIndex} 
            className="gallery-nav justify-content-center" 
            onSelect={this.groupSelect}
          >
            <span className="label">Albums:</span>
            {albumGroups.map((group, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={index}>{group.name}</Nav.Link>
              </Nav.Item>
            ))}
        </Nav>

        <div className="album-list">
          {navAlbums && navAlbums.map(album => {
              let cls = 'album-btn responsive thumbnail';
              if (selectedNav && selectedNav.tag === album.tag) {
                cls += ' selected-nav'
              }
              return (
                <div key={album.tag} id={album.tag} className={cls} onClick={() => this.navClick(album)}>
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
  handleClearGallery: PropTypes.func.isRequired
};

export default AlbumNav;
