import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withStacking } from '../higherOrder/withStacking';
// import StackLayer from '../Stacker/StackLayer';

import './style.scss';

const DataField = ({ fieldName, fieldLabel, fieldValue }) => {
  return fieldValue && fieldLabel ? (
    <Row className={`${fieldName}-field`}>
      <Col sm={6} xs={12}>
        <span className="label">{fieldLabel}</span>
      </Col>
      <Col sm={6} xs={12}>
        <span className="data">
          {fieldValue}
        </span>
      </Col>
    </Row>
  ) : '';
};

const ImageInfo = ({ imageData, contextFieldLabels }) => {
  return (
    <Container className="image-info">
      <Row>
        <Col xs={12}>
          <span className="title">{imageData.caption}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <span className="description text-muted">{imageData.alt}</span>
        </Col>
      </Row>
      { Object.keys(imageData).map(key => (
        <DataField 
          fieldName={key} 
          fieldLabel={contextFieldLabels[key]}
          fieldValue={imageData[key]}
        />
      ))}
    </Container>
  )
}

export default withStacking(ImageInfo);


