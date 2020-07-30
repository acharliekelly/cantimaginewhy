import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default () => (
  <>
    <Spinner variant="warning" animation="grow" />
    {' '}
    <Alert variant="warning">Loading...</Alert>
  </>
);