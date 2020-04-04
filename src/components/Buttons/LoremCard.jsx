import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { loremIpsum } from '../../../data/lorem';
import { withStacking } from '../HigherOrder/withStacking';

/**
 * Fits into Accordion Card stack
 * for testing
 */
const LoremOutput = () => (
  <>
    <Card.Title>Lorem Ipsum</Card.Title>
    <Card.Text>{loremIpsum}</Card.Text>
  </>
);

export const StackedLorem = ({index, variant = "light"}) => {
  const Lorem = withStacking(LoremOutput);
  return (
    <Lorem 
      eventKeyName={`lorem-${index}`} 
      cardTitle={`Card ${index}`} 
      variant={variant} />
  )
}

export const LoremStack = ({count}) => {
  const arr = [];
  for (let j=0; j<count; j++) {
    arr.push(j)
  }
  return (
    <>
      {arr.map((a,index) => (
        <StackedLorem key={index} index={index} />
      ))}
    </>
  )
}

export const LoremAccordion = ({stubCount, card}) => {
  return (
    <Accordion defaultActiveKey="lorem-0">
      <LoremStack count={stubCount} />
      {card}
    </Accordion>
  )
}
