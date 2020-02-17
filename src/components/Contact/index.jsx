import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { encode } from '../../utils/forms';

import './forms.scss';




export const ContactForm = () => (
  <Form className="contact-form" >
    <input type="hidden" name="form-name" value="contact-form" />
    <Form.Group controlId="contactForm.name">
      <Form.Label>Name:</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <Form.Group controlId="contactForm.email">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" />
    </Form.Group>
    <Form.Group controlId="contactForm.reason">
      <Form.Label>Reason:</Form.Label>
      <Form.Control as="select" >
        <option>General</option>
        <option>Report Problem</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="contactForm.message">
      <Form.Label>Message:</Form.Label>
      <Form.Control 
        as="textarea" 
        rows="5" 
      />
    </Form.Group>
    <Button variant="dark" type="submit">Submit</Button>
  </Form>
)

export class StatefulContactForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      reason: 'general',
      message: ''
    }
  }

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encode({ 'form-name': 'contact-form', ...this.state })
    })
    .then(() => alert('Success!'))
    .catch(error => alert(error));
    e.preventDefault();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {name, email, reason, message } = this.state;
    return (
      <Form className="contact-form" onSubmit={this.handleSubmit}>
        <input type="hidden" name="form-name" value="contact-form" />
        <Form.Group controlId="contactForm.name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Your Name" value={name} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="contactForm.email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="your.name@email.com" value={email} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="contactForm.reason">
          <Form.Label>Reason:</Form.Label>
          <Form.Control as="select" value={reason} onChange={this.handleChange}>
            <option>General</option>
            <option>Report Problem</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="contactForm.message">
          <Form.Label>Message:</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Enter your message here" 
            rows="5" 
            value={message}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit">Submit</Button>
      </Form>
    );
  }
}
