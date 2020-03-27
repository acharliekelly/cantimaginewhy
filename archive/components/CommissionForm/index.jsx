import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import { encode } from '/utils/system';


export const CommissionForm = props => {
  const { closeForm } = props;
  return (
    <Form name="orderForm" className="order-form">
      <input type="hidden" name="form-name" value="order-form" />
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Name:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="text" id="orderForm.name" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Email:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="email" id="orderForm.email" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Image:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="text" id="orderForm.imageId" />
      </InputGroup>
      
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Message:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as="textarea" id="orderForm.message" rows="3" />
        
      </InputGroup>
      <div className="buttons">
        <Button type="submit" variant="dark">Submit</Button>
        {closeForm && (
          <Button variant="light" onClick={closeForm}>Cancel</Button>
        )}
        </div>
      </Form>
  );
}

CommissionForm.propTypes = {
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


export class StatefulCommissionForm extends React.Component {
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
    const { closeForm } = this.props;
    const {name, email, message } = this.state;
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
        <Form.Control type="text"  />
      </Form.Group>
      <Form.Group controlId="orderForm.message">
        <Form.Label>Message:</Form.Label>
        <Form.Control 
          as="textarea"  
          rows="3" 
          value={message}
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

CommissionForm.propTypes = {
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




export const ModalCommission = props => {
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
        <CommissionForm imageId={imageId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalCommission.propTypes = {
  /**
   * Cloudinary publid Id
   */
  imageId: PropTypes.string.isRequired,
  /**
   * true if modal is visible
   */
  showForm: PropTypes.bool
};
