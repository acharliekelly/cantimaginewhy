import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { filters, navDescription } from '../../config/filters';
import '../../css/nav.scss';

class FilterNav extends Component {

  constructor (props) {
    super(props);

    this.state = {
      filterIndex: 0,
      hoverIndex: -1,
      selectedNav: null
    }
  }

  componentDidMount () {
    this.selectFilter(0);
  }

  selectFilter = eventKey => {
    // console.log('Sort selected: ' + eventKey);
    this.setState({
      filterIndex: eventKey,
      selectedNav: null
    });
    // clear thumbnails
    this.props.updateClearGallery();
  }

  selectItem = nav => {
    // nav is object (option) from filter list
    // { name, tag, thumbnail, description, sortField }
    // also, close explanation so as not to interfere with gallery
    this.setState({
      selectedNav: nav
    });

    this.props.updateSelectNav(nav);
  }

  hoverOnFilter = index => {
    this.setState({
      hoverIndex: index
    })
  }

  hoverOff = ev => {
    this.setState({
      hoverIndex: -1
    })
  }

  render () {
    const { filterIndex, selectedNav, hoverIndex, explanOpen } = this.state;
    const activeFilter = filters[filterIndex];
    const { updateSwitch } = this.props;
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
        <Navbar className="category-bar justify-content-between">

            <Button className="nav-switch" variant="outline-dark" onClick={updateSwitch}>
              <FontAwesomeIcon icon="images" title="Browse by Album" />
            </Button>

              
            <Nav className="filters" 
              variant="pills" 
              defaultActiveKey={0}  
              onSelect={this.selectFilter}
            >
              <Navbar.Text>Filter by:&nbsp;</Navbar.Text>
              {filters.map((filter, index) => (
                <Nav.Item 
                  key={index}
                  onMouseEnter={() => this.hoverOnFilter(index)} 
                  onMouseLeave={this.hoverOff}>
                  <Nav.Link eventKey={index}>{filter.name}</Nav.Link>
                </Nav.Item>
                )
              )}
            </Nav>
              
              <div className="category-desc">
                <Navbar.Text className="active-desc">{filters[filterIndex].description}</Navbar.Text>
                {hoverIndex >= 0 && (
                <Navbar.Text className="hover-desc">{filters[hoverIndex].description}</Navbar.Text>
                )}
              </div>
              
                <OverlayTrigger trigger="click" placement="bottom" overlay={
                  <Popover>
                    <Popover.Title>Filters</Popover.Title>
                    <Popover.Content>{navDescription}</Popover.Content>
                  </Popover>
                  }>
                  <Button className="help-btn" variant="outline-info">
                    <FontAwesomeIcon icon="question-circle" />
                  </Button>
                </OverlayTrigger>
             
        </Navbar>

        <Container fluid expand="lg" className="album-bar justify-content-between">
          <Row>
            <Col md={3}>
              {explanOpen ? (
                <div className="explain-box">
                  <span className="explanation">{navDescription}</span>
                </div>
              ) : (
                <div className="explain-closed">
                {selectedNav && (
                  <div className="current-item">
                    <div className="nav-title">{selectedNav.name}</div>
                    <div className="nav-description">{selectedNav.description}</div>
                  </div>
                )}
                </div>
              )}
            </Col>
            <Col md={6} className="album-col">
              <ul className="albums">
                {activeFilter.options.map(option => {
                  let cls = 'album-btn responsive thumbnail';
                  if (selectedNav && selectedNav.tag === option.tag) {
                    cls += ' selected-nav'
                  }
                  return (
                    <li key={option.tag} id={option.tag} className={cls} onClick={() => this.selectItem(option)}>
                      <Image publicId={`${option.thumbnail}`}>
                        <Transformation defaultImage={defaultImg} />
                        <Transformation height="80" width="80" crop="fill" />   
                      </Image>
                      <div className="album-name">{option.name}</div>
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col md={3} className="desc-col">
            
            </Col>
          </Row>
        </Container>
      </CloudinaryContext>
    );
  }
}

FilterNav.propTypes = {
  updateSelectNav: PropTypes.func.isRequired,
  updateClearGallery: PropTypes.func
};

export default FilterNav;
