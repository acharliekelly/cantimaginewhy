import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Image } from 'cloudinary-react';

import './forms.scss';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const orderMessage = price => {
  return `I would like to purchase this original painting, currently for sale at $${price}. Please contact me about how to proceed.`;
}

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

export const OrderForm = props => {
  const { imageId, price, closeForm } = props;
  const imgRef = imageId.split('/')[1];
  return (
    <Form name="orderForm" className="order-form">
      <input type="hidden" name="form-name" value="order-form" />
      <Form.Group controlId="orderForm.name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Your Name" />
      </Form.Group>
      <Form.Group controlId="orderForm.email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="your.name@email.com" />
      </Form.Group>
      <Form.Group controlId="orderForm.imageId">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="text" value={imgRef} readOnly />
        {/* <Image cloudName="cantimaginewhy" publicId={imageId} height="80" crop="fit" /> */}
      </Form.Group>
      <Form.Group controlId="orderForm.message">
        <Form.Label>Message:</Form.Label>
        <Form.Control 
          as="textarea"  
          rows="3" 
          defaultValue={orderMessage(price)}
          />
      </Form.Group>
      <div className="buttons">
        <Button type="submit" variant="dark">Submit</Button>
        {closeForm && (
          <Button variant="light" onClick={closeForm}>Cancel</Button>
        )}
        </div>
      </Form>
  );
}

OrderForm.propTypes = {
  /**
   * Cloudinary public ID
   */
  imageId: PropTypes.string.isRequired,
  /**
   * the display price
   */
  price: PropTypes.string,
  /**
   * function to close the form
   */
  closeForm: PropTypes.func,
  /**
   * function for successful submission
   */
  submitSuccess: PropTypes.func,
  /**
   * function for failed submission
   */
  submitFail: PropTypes.func
};


export class StatefulOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encode({ 'form-name': 'order-form', ...this.state })
    })
    .then(this.props.submitSuccess)
    .catch(error => alert(error));
    e.preventDefault();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    const { imageId, price, closeForm } = this.props;
    const {name, email, message } = this.state;
    const imgRef = imageId.split('/')[1];
    return (
      <Form name="orderForm" className="order-form" onSubmit={this.handleSubmit}>
      <input type="hidden" name="form-name" value="order-form" />
      <Form.Group controlId="orderForm.name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Your Name" value={name} onChange={this.handleChange} />
      </Form.Group>
      <Form.Group controlId="orderForm.email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="your.name@email.com" value={email} onChange={this.handleChange} />
      </Form.Group>
      <Form.Group controlId="orderForm.imageId">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="text" value={imgRef} readOnly />
      </Form.Group>
      <Form.Group controlId="orderForm.message">
        <Form.Label>Message:</Form.Label>
        <Form.Control 
          as="textarea"  
          rows="3" 
          value={message}
          defaultValue={orderMessage(price)}
          onChange={this.handleChange}
          />
      </Form.Group>
      <div className="buttons">
        <Button type="submit" variant="dark">Submit</Button>
        {closeForm && (
          <Button variant="light" onClick={closeForm}>Cancel</Button>
        )}
        </div>
      </Form>
    )
  }
}

StatefulOrderForm.propTypes = {
  /**
   * Cloudinary public ID
   */
  imageId: PropTypes.string.isRequired,
  /**
   * the display price
   */
  price: PropTypes.string,
  /**
   * function to close the form
   */
  closeForm: PropTypes.func,
  /**
   * function for successful submission
   */
  submitSuccess: PropTypes.func,
  /**
   * function for failed submission
   */
  submitFail: PropTypes.func
};




export const ModalOrder = props => {
  const { imageId, showForm } = props;
  const [ show, setShow ] = useState(false);
  // const handleShow = setShow(true);
  const handleClose = setShow(false);

  if (showForm) {
    setShow(true);
  }
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buy Original Artwork</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OrderForm imageId={imageId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalOrder.propTypes = {
  /**
   * Cloudinary publid Id
   */
  imageId: PropTypes.string.isRequired,
  /**
   * true if modal is visible
   */
  showForm: PropTypes.bool
};
