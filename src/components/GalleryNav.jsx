import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { albums, media, seasons, styles, availability } from '../utils/sorting';
import '../css/list.css';

const sortMethods = [ albums, media, seasons, styles, availability ];

class GalleryNav extends Component {

  constructor (props) {
    super(props);

    this.state = {
      sortIndex: 0
    }
  }

  handleSortSelect = eventKey => {
    // console.log('Sort selected: ' + eventKey);
    this.setState({
      sortIndex: eventKey
    })
    this.props.handleClearGallery();
  }

  render () {
    const { sortIndex } = this.state;
    const sortList = sortMethods[sortIndex];
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <Nav variant="pills" className="gallery-nav" onSelect={this.handleSortSelect}>
          <Nav.Item>
            <Nav.Link eventKey="0">Album</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="1">Medium</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Season</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3">Style</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4">Availability</Nav.Link>
          </Nav.Item>
        </Nav>
        <header className="album-list">
          {sortList.map(album => {
            /*  generate album list */
              return (
                <div key={album.tag} id={album.tag} className="album-btn" onClick={() => this.props.handleNavChange(album.tag)}>
                    <Image  
                        publicId={`${album.thumbnail}`}
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

GalleryNav.propTypes = {
  handleNavChange: PropTypes.func.isRequired,
  handleClearGallery: PropTypes.func
};

export default GalleryNav;
