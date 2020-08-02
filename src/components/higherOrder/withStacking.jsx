import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


// HOC for putting component into Stack
const withStacking = props => WrappedComponent => {
  class WithStacking extends React.Component {
    
    render () {
      const { eventKeyName, cardTitle, variant, maxHeight, enabled, 
        ...passThroughProps} = props;

      return (
        <Card className="stacked-card" border={variant} text={variant}>
          <Accordion.Toggle 
            as={Card.Header} 
            eventKey={eventKeyName} 
            disabled={!enabled} 
            style={{cursor: 'pointer'}}
          >
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
  WithStacking.displayName = `WithStacking(${WrappedComponent.name})`;
  return WithStacking;
}

export default withStacking;
