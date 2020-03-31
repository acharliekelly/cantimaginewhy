import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { albumExplanations } from '../../config/text';
// import { variableImageSrc } from '../../utils/imageApi';

/**
 * Should fit into Accordion Card Stack (left-nav)
 * @param {*} props 
 */
const Explan = props => {
  const { tagObject, stackPosition, cardTitle } = props;
  let explanText;
  if (tagObject) {
    explanText = albumExplanations[tagObject.tag];
  }
  if (explanText) {
    return (
      <Card className="explan" border={props.variant} text={props.variant}> 
        <Accordion.Toggle as={Card.Header} eventKey={stackPosition}>
          <strong>{cardTitle}</strong>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={stackPosition}>
          <Card.Body>
            <Card.Title>{tagObject.name}</Card.Title>
            <Card.Text style={{textAlign: 'left'}}>{explanText}</Card.Text>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
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
   * what position in the stack (top = 0)
   */
  stackPosition: PropTypes.number,
  /**
   * title for card
   */
  cardTitle: PropTypes.string,
  variant: PropTypes.string
};

Explan.defaultProps = {
  stackPosition: 0,
  cardTitle: 'About Album',
  variant: 'dark'
}

export default Explan;
