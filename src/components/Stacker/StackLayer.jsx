import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


/**
 * @property {String} keyName Accordion eventKey
 * @property {String} cardTitle Accordion header title
 * @property {String} variant Bootstrap variant
 * @property {boolean} enabled make layer expandable
 * @property {int} maxHeight maximum allowable height of layer, in vh
 */
const StackLayer = props => {
  const { 
    keyName, 
    cardTitle, 
    variant, 
    enabled, 
    maxHeight
  } = props;

  return (
    <Card className="stacked-card" border={variant} text={variant}>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={keyName}
        disabled={!enabled}
        style={{cursor: 'pointer'}}
        >
          <strong>{cardTitle}</strong>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={keyName}>
          <Card.Body style={{maxHeight: `${maxHeight}vh`, overflow: 'auto'}}>
            {props.children}
          </Card.Body>
        </Accordion.Collapse>
    </Card>
  )
};

StackLayer.propTypes = {
  keyName: PropTypes.string.isRequired, 
  cardTitle: PropTypes.string.isRequired, 
  variant: PropTypes.string, 
  enabled: PropTypes.bool, 
  maxHeight: PropTypes.number   // vh
};

StackLayer.defaultProps = {
  variant: "primary",
  enabled: true,
  maxHeight: 60
};


export default StackLayer;