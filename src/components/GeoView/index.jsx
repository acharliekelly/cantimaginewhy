import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


const extractGeo = geotag => {
  const geo = geotag.split(',');
  if (geo && geo.length === 2) {
    return {
      lat: parseFloat(geo[0]),
      lng: parseFloat(geo[1])
    }
  } else {
    return null;
  }
  
}

// const GeoView = withScriptjs(withGoogleMap((props) => {
const GeoView = props => {
  const [ position, setPosition ] = useState(null);
  const { geoTag } = props;

  useEffect(() => {
    const pos = extractGeo(geoTag);
    setPosition(pos);
  }, [geoTag])

  if (position) {
    return (
      <div>
        <header>Position</header>
        <div>Latitude: {position.lat}</div>
        <div>Longitude: {position.lng}</div>
      </div>
      // <Map google={props.google}
      //   zoom={8}
      //   style={{width: '100%', height: '100%'}}
      //   initialCenter={position}>
      //   <Marker position={position} />
      // </Map>
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

// export default GoogleApiWrapper({
//   apiKey: 'KEY GOES HERE'
// })(GeoView);

export default GeoView;
