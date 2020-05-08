import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { getExplanation } from '../../utils/tagUtils';
import { withStacking } from '../higherOrder/withStacking';
import { Breakpoint } from 'react-socks';


/**
 * Should fit into Accordion Card Stack (left-nav)
 * @param {*} props 
 */
const Explan = props => {
  const { tagObject, fullText } = props;
  let explanText;
  if (fullText) {
    explanText = fullText;
  } else if (tagObject) {
    explanText = getExplanation(tagObject, false);
  }
  if (explanText) {
    return (
      <Card.Body>
        <Breakpoint md up>
          <Card.Title>{tagObject.name}</Card.Title>
        </Breakpoint>
        <Card.Text style={{textAlign: 'left'}}>{explanText}</Card.Text>
      </Card.Body>
    )
  }
  return '';
}

Explan.propTypes = {
  /**
   * the Tag Object (album) that was clicked
   * to load the gallery
   */
  tagObject: PropTypes.object.isRequired,
  /**
   * just pass in the text instead of the key
   */
  fullText: PropTypes.string,
};

export default withStacking(Explan);
