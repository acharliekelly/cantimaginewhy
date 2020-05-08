import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


// HOC for putting component into Stack
export function withStacking(WrappedComponent) {
  return class extends React.Component {
    
    render () {
      const { eventKeyName, cardTitle, variant, maxHeight, enabled, ...passThroughProps} = this.props;

      return (
        <Card className="stacked-card" border={variant} text={variant}>
          <Accordion.Toggle as={Card.Header} eventKey={eventKeyName} disabled={!enabled} style={{cursor: 'pointer'}}>
            <strong>{cardTitle}</strong>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={eventKeyName}>
            <Card.Body style={{maxHeight: `${maxHeight}vh`, overflow: 'auto'}}>
              <WrappedComponent {...passThroughProps} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }
  }
}
