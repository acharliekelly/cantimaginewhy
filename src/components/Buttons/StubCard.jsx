import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { loremIpsum } from '../../../data/lorem';

/**
 * Fits into Accordion Card stack
 * for testing
 */
export const StubCard = ({index}) => (
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey={index}>
      Card #{index}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={index}>
      <Card.Body>
        <Card.Title>Lorem Ipsum</Card.Title>
        <Card.Text>{loremIpsum}</Card.Text>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
);

export const StubCardSeries = ({count}) => {
  const arr = [];
  for (let j=0; j<count; j++) {
    arr.push(j)
  }
  return (
    <>
      {arr.map((a,index) => (
        <StubCard key={index} index={index} />
      ))}
    </>
  )
}

export const StubAccordion = ({stubCount, card}) => {
  return (
    <Accordion defaultActiveKey="0">
      <StubCardSeries count={stubCount} />
      {card}
    </Accordion>
  )
}
