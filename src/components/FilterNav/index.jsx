import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { filters } from '../../config/filters';
import '../../css/nav.scss';

class FilterNav extends Component {

  constructor (props) {
    super(props);

    this.state = {
      filterIndex: 0,
      hoverFilter: -1,
      selectedNav: null
    }
  }

  componentDidMount () {
    this.handleFilterSelect(0);
  }

  handleFilterSelect = eventKey => {
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
    // { name, tag, thumbnail, description, sortField }
    this.setState({
      selectedNav: nav
    });

    this.props.handleNavChange(nav);
  }

  filterHover = idx => {
    // const filter = ev.target.eventKey;
    this.setState({
      hoverFilter: idx
    })
  }

  dropHover = ev => {
    this.setState({
      hoverFilter: -1
    })
  }

  render () {
    const { filterIndex, selectedNav, hoverFilter } = this.state;
    const activeFilter = filters[filterIndex];
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <Nav 
          variant="pills" 
          defaultActiveKey={0} 
          className="gallery-nav justify-content-center" 
          onSelect={this.handleFilterSelect}
        >
          <span className="label">Filter By:</span>
          {filters.map((filter, index) => (
            <Nav.Item key={index}
                onMouseEnter={() => this.filterHover(index)} 
                onMouseLeave={this.dropHover}>
              <Nav.Link eventKey={index}>{filter.name}</Nav.Link>
            </Nav.Item>
            )
          )}
        </Nav>
        <div className="album-list">
          {activeFilter.options.map(option => {
              let cls = 'album-btn responsive thumbnail';
              if (selectedNav && selectedNav.tag === option.tag) {
                cls += ' selected-nav'
              }
              return (
                <div key={option.tag} id={option.tag} className={cls} onClick={() => this.handleNavClick(option)}>
                    <Image  
                        publicId={`${option.thumbnail}`}
                        dpr="auto"
                        responsive
                        height="80"
                        crop="fit"
                    >
                        <Transformation quality="auto" fetchFormat="auto" />
                        <Transformation defaultImage={defaultImg} />
                    </Image>
                    <div className="album-name">{option.name}</div>
                </div>
              );
            })}
          </div>
          <div className="group-description">
            <span>&nbsp;</span>
            {hoverFilter >= 0 && (filters[hoverFilter].description)}
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

FilterNav.propTypes = {
  handleNavChange: PropTypes.func.isRequired,
  handleClearGallery: PropTypes.func
};

export default FilterNav;
