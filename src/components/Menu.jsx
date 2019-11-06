import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Image } from 'cloudinary-react';

export default function Menu() {
  return (
    <header className="menu">
      <div className="column left-col justify-content-center site-logo" lg={2}>
        <Image cloudName="cantimaginewhy" publicId="ck_logo" height="50" />
      </div>
      <Nav className="column mid-col" defaultActiveKey="/home" lg={7}>
        <Nav.Item>
          <NavLink to="/home">Home</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/artwork">Artwork</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/about">About</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/contact">Contact</NavLink>
        </Nav.Item>
      </Nav>
      <div className="column right-col" lg={3}>
        <Container className="justify-content-right">
          <Row>
            <Col>
              <Image cloudName="cantimaginewhy" className="cart" publicId="shopping-cart" width="50" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control type="text" size="sm" placeholder="e.g. Boston, Summer, Landscape, etc" />
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  );
}
