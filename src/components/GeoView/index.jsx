import React from 'react';
import PropTypes from 'prop-types';

import MapButton from '../Buttons/MapButton';
import MapContainer from '.';
import { withStacking } from '../higherOrder/withStacking';


// const GeoView = withScriptjs(withGoogleMap((props) => {
const GeoView = props => {
  // const [ position, setPosition ] = useState(null);
  const { available, latitude, longitude, markerLabel } = props;


  const position = { 
    lat: latitude, 
    lng: longitude 
  }

  if (available) {
    const mapStyle = {
      border: '2px ridge #06074b', 
      borderRadius: '0.2rem', 
      margin: '2rem auto', 
      cursor: 'pointer'
    }

    return (
        <div className="geo-placeholder" style={mapStyle}>
          <MapContainer label={markerLabel} position={position} />
          <div style={{ height: '2vh'}} />
          <MapButton 
            variant="outline-secondary" 
            latitude={latitude} 
            longitude={longitude} 
          />
          
        </div>
      )
      
  } else {
    return '';
  }
  
}

GeoView.propTypes = {
  /**
   * ID for lookup
   */
  publicId: PropTypes.string,
  /**
   * the coordinates, if known, as single string "lat,long"
   */
  geoTag: PropTypes.string,
}

export default withStacking(GeoView);
