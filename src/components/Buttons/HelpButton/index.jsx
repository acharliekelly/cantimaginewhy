import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const imgOnlyStyle = {
  padding: '2px', 
  borderRadius: '2px', 
  backgroundColor: 'transparent',
  color: '#eee',
  cursor: 'pointer'
}

const HelpButton = props => (
  <OverlayTrigger trigger="click" placement={props.placement} overlay={
    <Popover>
      <Popover.Title>{props.header}</Popover.Title>
      <Popover.Content>{props.content}</Popover.Content>
    </Popover>
  }>
    {props.imageOnly ? (
      <div className="help-btn" style={imgOnlyStyle}>
        <FontAwesomeIcon icon="question-circle" size={props.size} />
      </div>
    ) : (
      <Button className="help-btn" variant={props.variant} title="Help">
        <FontAwesomeIcon icon="question-circle" size={props.size} />
      </Button>
    )}
  </OverlayTrigger>
);


HelpButton.propTypes = {
  /**
   * Title of the help message
   */
  header: PropTypes.string,
  /**
   * the help message
   */
  content: PropTypes.string,
  /**
   * placement of the message
   */
  placement: PropTypes.string,
  /**
   * size of the icon
   */
  size: PropTypes.string,
  /**
   * just make a clickable icon, no button
   */
  imageOnly: PropTypes.bool,
  /**
   * button color
   */
  variant: PropTypes.string
}

HelpButton.defaultProps = {
  header: 'Help',
  placement: 'bottom',
  size: 'lg',
  imageOnly: false,
  variant: 'outline-info'
}

export default HelpButton;
