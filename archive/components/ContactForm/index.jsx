import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { 
  encode, 
  SubmissionMethod, 
  formSubmissionTarget,
  handleFormSuccess,
  handleFormFail 
} from '../../utils/forms';

import './forms.scss';




export const ContactForm = props => {
  const { formSubmitType } = props;
  const formsTarget = formSubmissionTarget(formSubmitType);
  return (
    <Form className="contact-form" action={formsTarget} >
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
}

ContactForm.propTypes = {
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
  submitFail: PropTypes.func,
  /**
   * how to submit form
   */
  formSubmitType: PropTypes.number
};

ContactForm.defaultProps = {
  formSubmitType: SubmissionMethod.Undetermined,
  submitSuccess: handleFormSuccess,
  submitFail: handleFormFail
}


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
    const { submitSuccess, submitFail, formSubmitType } = this.props;
    const formAction = formSubmissionTarget(formSubmitType);
    fetch(formAction, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encode({ 'form-name': 'contact-form', ...this.state })
    })
    .then(submitSuccess)
    .catch(error => {
      console.error(error);
      submitFail();
    })
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
          <Form.Control type="text" value={name} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="contactForm.email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={this.handleChange} />
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

StatefulContactForm.propTypes = {
  formSubmitType: PropTypes.number,
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
  submitFail: PropTypes.func,
};

StatefulContactForm.defaultProps = {
  formSubmitType: SubmissionMethod.Undetermined,
  submitSuccess: handleFormSuccess,
  submitFail: handleFormFail
};
