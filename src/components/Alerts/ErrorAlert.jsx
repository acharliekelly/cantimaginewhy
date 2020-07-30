import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default ({ error }) => (
  <Alert variant="danger">{error}</Alert>
);

