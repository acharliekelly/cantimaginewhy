import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { albumGroups, navDescription } from '../../config/albums';

import '../../css/nav.scss';

class AlbumNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groupIndex: 0,
      hoverIndex: -1,
      selectedNav: null,
      explanOpen: true
    }
  }

  hoverOnGroup = index => {
    this.setState({
      hoverIndex: index
    });
  }

  hoverOff = ev => {
    this.setState({
      hoverIndex: -1
    });
  }

  componentDidMount () {
    this.selectGroup(0);

  }

  selectItem = nav => {
    // nav is object (album) from album list
    // { name, tag, thumbnail, description, sortField }
    this.setState({
      selectedNav: nav,
      explanOpen: false
    })
    this.props.updateSelectNav(nav);
  }

  selectGroup = eventKey => {
    this.props.updateClearGallery();
    this.setState({
      groupIndex: eventKey,
      selectedNav: null,
      hoverIndex: -1
    })
    
  }

  toggleExplanation = () => {
    const { explanOpen } = this.state;
    this.setState({
      explanOpen: !explanOpen
    })
  }

  render () {
    const { groupIndex, selectedNav, hoverIndex, explanOpen } = this.state;
    const activeGroup = albumGroups[groupIndex];
    const helpBtnVar = explanOpen ? 'info' : 'outline-info';
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
         <Navbar className="category-bar justify-content-between">
          <Button className="help-btn" variant={helpBtnVar} onClick={this.toggleExplanation}>
            <FontAwesomeIcon icon="question-circle" />
          </Button>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="filters" 
                variant="pills" 
                defaultActiveKey={0}  
                onSelect={this.selectGroup}
              >
              <Navbar.Text className="label">Filter By:&nbsp;</Navbar.Text>
              {albumGroups.map((group, index) => (
                <Nav.Item 
                  key={index}
                  onMouseEnter={() => this.hoverOnGroup(index)} 
                  onMouseLeave={this.hoverOff}>
                  <Nav.Link eventKey={index}>{group.name}</Nav.Link>
                </Nav.Item>
                )
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end category-desc">
            <Navbar.Text className="active-desc">{albumGroups[groupIndex].description}</Navbar.Text>
            {hoverIndex >= 0 && (
            <Navbar.Text className="hover-desc">{albumGroups[hoverIndex].description}</Navbar.Text>
            )}
          </Navbar.Collapse>
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
                {activeGroup && activeGroup.albums.map(album => {
                  let cls = 'album-btn responsive thumbnail';
                  if (selectedNav && selectedNav.tag === album.tag) {
                    cls += ' selected-nav'
                  }
                  return (
                    <li key={album.tag} id={album.tag} className={cls} onClick={() => this.selectItem(album)}>
                        <Image publicId={`${album.thumbnail}`}>
                            <Transformation defaultImage={defaultImg} />
                            <Transformation height="80" width="80" crop="fill" />   
                        </Image>
                        <div className="album-name">{album.name}</div>
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

AlbumNav.propTypes = {
  updateSelectNav: PropTypes.func.isRequired,
  updateClearGallery: PropTypes.func
};

export default AlbumNav;
