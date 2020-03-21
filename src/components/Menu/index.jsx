import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import ContactLinks from '../ContactLinks/';
// import EnvMode from '../EnvMode/'
import { fetchGallery } from '../../utils/imageApi';
import { selectLightboxUtil} from '../../utils/imageUtils';


import './menu.scss';

const Menu = props => {
  const { selectLightbox } = props;
  const logoId = 'ciw4';

  const openZoom = () => {
    fetchGallery('logo').then(res => {
      selectLightbox(logoId, res.data.resources);
    })
  }

  return (
    <CloudinaryContext className="menu-wrapper" cloudName="cantimaginewhy">
      <Navbar expand="lg" bg="light">
        <Navbar.Brand>
          <Image publicId="logo_th" onClick={openZoom}>
            <Transformation height="80" width="80" radius="max" crop="scale" />
          </Image>
        </Navbar.Brand>
        <Container>
          <Nav className="mr-auto" defaultActiveKey="#home">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#artwork">Artwork</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="https://charlie-kelly.pixels.com" target="_blank" rel="noreferrer noopener">Shop</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Container>
        <Container className="justify-content-end">
          <ContactLinks layout="horiz" displayType="icon" size={2} />
        </Container>
      </Navbar>
    </CloudinaryContext>
  );
}

Menu.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  devMode: PropTypes.func
}

Menu.defaultProps = {
  selectLightbox: selectLightboxUtil
};

export default Menu;
