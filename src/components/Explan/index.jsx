import React from 'react';
import Card from 'react-bootstrap/Card';
import { withStacking } from '../higherOrder/withStacking';
import { Breakpoint } from 'react-socks';


/**
 * Should fit into Accordion Card Stack (left-nav)
 * @param {*} props 
 */
const Explan = props => {
  const { tagName, explanText } = props;
  
  if (explanText) {
    return (
      <Card.Body>
        <Breakpoint md up>
          <Card.Title>{tagName}</Card.Title>
        </Breakpoint>
        <Card.Text style={{textAlign: 'left'}}>{explanText}</Card.Text>
      </Card.Body>
    )
  }
  return '';
}

export default withStacking(Explan);
