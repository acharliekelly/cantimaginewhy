import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { filters } from '../utils/sorting';
import '../css/navlist.scss';

class GalleryNav extends Component {

  constructor (props) {
    super(props);

    this.state = {
      filterIndex: 0,
      selectedNav: null
    }
  }

  componentDidMount () {
    this.handleSortSelect(0);
  }

  handleSortSelect = eventKey => {
    // console.log('Sort selected: ' + eventKey);
    this.setState({
      filterIndex: eventKey,
      selectedNav: null
    });
    // clear thumbnails
    this.props.handleClearGallery();
  }

  handleNavClick = nav => {
    // nav is object (option) from filter list
    // { name, tag, thumbnail, description }
    this.setState({
      selectedNav: nav
    });

    this.props.handleNavChange(nav.tag);
  }

  render () {
    const { filterIndex, selectedNav } = this.state;
    const activeFilter = filters[filterIndex];
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <Nav variant="pills" className="gallery-nav" onSelect={this.handleSortSelect}>
          {filters.map(filter => (
            <Nav.Item key={filter.name}>
              <Nav.Link eventKey={filter.index}>{filter.name}</Nav.Link>
            </Nav.Item>
            )
          )}
        </Nav>
        <header className="album-list">
          {activeFilter.options.map(option => {
              let cls = 'album-btn';
              if (selectedNav && selectedNav.tag === option.tag) {
                cls += ' selected-nav'
              }
              return (
                <div key={option.tag} id={option.tag} className={cls} onClick={() => this.handleNavClick(option)}>
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
                    <div className="album-name">{option.name}</div>
                    {/* <div className="album-desc">{option.description}</div> */}
                </div>
              );
            })}
        </header>
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

GalleryNav.propTypes = {
  handleNavChange: PropTypes.func.isRequired,
  handleClearGallery: PropTypes.func
};

export default GalleryNav;
