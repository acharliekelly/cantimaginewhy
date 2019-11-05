import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../css/forms.scss';

export const ContactForm = () => {
  return (
    <Form>
      <Form.Group controlId="contactForm.name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Your Name" />
      </Form.Group>
      <Form.Group controlId="contactForm.email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="your.name@email.com" />
      </Form.Group>
      <Form.Group controlId="contactForm.reason">
        <Form.Label>Reason:</Form.Label>
        <Form.Control as="select">
          <option>General</option>
          <option>Report Problem</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="contactForm.message">
        <Form.Label>Message:</Form.Label>
        <Form.Control as="textarea" placeholder="Enter your message here" rows="5" />
      </Form.Group>
      <Button variant="dark" type="submit" disabled onClick={ev => {
        ev.preventDefault();
        console.log('Contact form submitted');
      }}>(nothing actually happens if you click this)</Button>
    </Form>
  );
}

export const OrderForm = imageId => {
  return (
    <Form>
      <Form.Group controlId="orderForm.name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Your Name" />
      </Form.Group>
      <Form.Group controlId="orderForm.email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="your.name@email.com" />
      </Form.Group>
      <Form.Group controlId="orderForm.message">
        <Form.Label>Message:</Form.Label>
        <Form.Control as="textarea" placeholder="Enter your message here" rows="5" />
      </Form.Group>
      <Button type="submit" onClick={ev => {
        ev.preventDefault();
        console.log('Order form submitted for: ' + imageId);
      }}>Submit</Button>
    </Form>
  );
}
