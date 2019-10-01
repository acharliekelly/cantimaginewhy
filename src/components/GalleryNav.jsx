import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
// import { albums, media, seasons, styles, availability } from '../utils/sorting';
import { filters } from '../utils/sorting';
import '../css/list.css';

// const sortMethods = [ albums, media, seasons, styles, availability ];

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
    const activeFilter = filters[sortIndex];
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <Nav variant="pills" className="gallery-nav" onSelect={this.handleSortSelect}>
          {filters.map(filter => (
            <Nav.Item>
              <Nav.Link eventKey={filter.index}>{filter.name}</Nav.Link>
            </Nav.Item>
          )
          )}
        </Nav>
        <header className="album-list">
          {activeFilter.options.map(option => {
            /*  generate album list */
              return (
                <div key={option.tag} id={option.tag} className="album-btn" onClick={() => this.props.handleNavChange(option.tag)}>
                    <Image  
                        publicId={`${option.thumbnail}`}
                        className="thumbnail inline"
                        width="150"
                        height="150"
                        crop="fit"
                        quality="80"
                    >
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                    <h3 className="album-name">{option.name}</h3>
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
