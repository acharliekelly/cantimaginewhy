import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const HelpButton = props => (
  <OverlayTrigger trigger="click" placement="bottom" overlay={
    <Popover>
      <Popover.Title>{props.header}</Popover.Title>
      <Popover.Content>{props.content}</Popover.Content>
    </Popover>
  }>
    <Button className="help-btn" variant="outline-info">
      <FontAwesomeIcon icon="question-circle" />
    </Button>
  </OverlayTrigger>
);


HelpButton.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string
}

HelpButton.defaultProps = {
  header: 'Help'
}

export default HelpButton;
