import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const HelpButton = props => (
  <OverlayTrigger trigger="click" placement={props.location} overlay={
    <Popover>
      <Popover.Title>{props.header}</Popover.Title>
      <Popover.Content>{props.content}</Popover.Content>
    </Popover>
  }>
    <Button className="help-btn" variant="outline-info">
      <FontAwesomeIcon icon="question-circle" size={`${props.size}x`} />
    </Button>
  </OverlayTrigger>
);


HelpButton.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string,
  location: PropTypes.string,
  size: PropTypes.number
}

HelpButton.defaultProps = {
  header: 'Help',
  location: 'bottom',
  size: 1
}

export default HelpButton;
