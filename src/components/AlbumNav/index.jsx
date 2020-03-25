import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { defaultImg } from '../../utils/imageApi';
import { albums, navDescription } from '../../config/albums';
import HelpButton from '../Buttons/HelpButton/';

import '../../css/nav.scss';

class AlbumNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedNav: null
    }
  }

  componentDidMount () {
    // this.selectGroup(0);
    this.props.updateClearGallery();
  }

  selectItem = nav => {
    // nav is object (album) from album list
    // { name, tag, thumbnail, description, sortField }
    this.setState({
      selectedNav: nav
    })
    this.props.updateSelectNav(nav);
  }


  render () {
    const { selectedNav } = this.state;
    
    return (
      <CloudinaryContext cloudName="cantimaginewhy">
         <Navbar className="category-bar justify-content-around">

          <Button className="nav-switch" variant="outline-dark" onClick={this.props.updateSwitch}>
            <FontAwesomeIcon icon="filter" title="Browse by Filter" />
          </Button>

          <Navbar.Text>
            <span className="browse-title">Browse by Album</span>
          </Navbar.Text>
              
          <HelpButton header="Albums" content={navDescription} />
        
        </Navbar>

        <Container fluid expand="lg" className="album-bar justify-content-between">
          <Row>
            <Col md={3}>
            {selectedNav && (
              <div className="current-item">
                <div className="nav-title">{selectedNav.name}</div>
                <div className="nav-description">{selectedNav.description}</div>
              </div>
            )}
            </Col>
            <Col md={6} className="album-col">
              <ul className="albums">
                {albums.map((album, index) => {
                  let cls = 'album-btn responsive thumbnail';
                  if (selectedNav && selectedNav.tag === album.tag) {
                    cls += ' selected-nav'
                  }
                  return (
                    <li 
                      key={index} 
                      id={album.tag} 
                      className={cls} 
                      onClick={() => this.selectItem(album)}
                    >
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
  updateClearGallery: PropTypes.func.isRequired,
  updateSwitch: PropTypes.func.isRequired
};

export default AlbumNav;
