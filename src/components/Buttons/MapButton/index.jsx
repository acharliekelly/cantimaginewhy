import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { getMapLink } from '../../../utils/geoUtils';

const MapButton = props => {
  const { latitude, longitude, size, variant } = props;
  const url = getMapLink(latitude, longitude)
  return (
    <Button 
      size={size}
      className="map-btn" 
      title="View this location"
      as="a" 
      variant={variant}
      rel="noopener noreferrer"
      target="_blank"
      href={url}>
        <FontAwesomeIcon icon="map-marked-alt" size={size} />
    </Button>
  )
}

MapButton.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
}

MapButton.defaultProps = {
  variant: 'info',
  size: 'lg'
}

export default MapButton
