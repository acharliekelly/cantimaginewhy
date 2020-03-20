import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Nav from 'react-bootstrap/Nav';
import { defaultImg } from '../../utils/imageApi';
import { albumGroups } from '../../config/albums';

import '../../css/nav.scss';

class AlbumNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groupIndex: 0,
      hoverGroup: -1,
      navAlbums: [],
      selectedNav: null
    }
  }

  groupHover = idx => {
    // const group = ev.target.eventKey;
    this.setState({
      hoverGroup: idx
    });
    console.log('Hover on ' + idx)
  }

  dropHover = ev => {
    this.setState({
      hoverGroup: -1
    });
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
      selectedNav: null,
      hoverGroup: -1
    })
    
  }

  render () {
    const { navAlbums, groupIndex, selectedNav, hoverGroup } = this.state;
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
              <Nav.Item key={index} 
                onMouseEnter={() => this.groupHover(index)} 
                onMouseLeave={this.dropHover}>
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
                        height="80"
                        crop="fit"
                    >
                        <Transformation defaultImage={defaultImg} />
                    </Image>
                    <div className="album-name">{album.name}</div>
                </div>
              );
            })}
          </div>
          <div className="group-description">
            <span>&nbsp;</span>
            {hoverGroup >= 0 && (albumGroups[hoverGroup].description)}
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
