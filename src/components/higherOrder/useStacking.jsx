import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

function useStacking(
    keyName, cardTitle, variant, enabled, maxHeight,
    children) {
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
            {children}
          </Card.Body>
        </Accordion.Collapse>
    </Card>
  )
}

export default useStacking;