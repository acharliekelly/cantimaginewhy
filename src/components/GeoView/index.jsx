import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Map, Marker, GoogleApiWrapper, withGoogleMap, withScriptjs } from 'google-maps-react';
import MapButton from '../Buttons/MapButton';
import { getMapLink } from '../../utils/geoUtils';
import { withStacking } from '../higherOrder/withStacking';
// import { GOOGLE_MAPS_API } from '../../utils/geoUtils';
import { Image } from 'cloudinary-react';

const extractGeo = geotag => {
  const geo = geotag.split(',');
  if (geo && geo.length === 2) {
    return {
      lat: parseFloat(geo[0].trim()),
      lng: parseFloat(geo[1].trim())
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
    const mapStyle = {
      border: '2px ridge #06074b', 
      borderRadius: '0.2rem', 
      margin: '2rem auto', 
      cursor: 'pointer'
    }

    return (
      <div className="geo-placeholder">
        <a target="_blank" rel="noopener noreferrer" href={getMapLink(position.lat, position.lng)}>
          <Image 
            publicId="icon/gmap" 
            title="Click to view location in Google Maps"
            style={mapStyle}
            />
        </a>
        <br/>
        <MapButton variant="outline-secondary" latitude={position.lat} longitude={position.lng} />
        
        {/* <div className="help-text" style={{marginBottom: '2vh'}}>
        Coming Soon: A map inside this box. For now, click the button to open map in a new tab.
        </div>
        <div style={{float: 'right'}}>
          <MapButton variant="outline-secondary" latitude={position.lat} longitude={position.lng} />
        </div>
        <div>Latitude: {position.lat}</div>
        <div>Longitude: {position.lng}</div> */}
        
        {/* <Map google={props.google}
          zoom={8}
          style={{width: '100%', height: '100%'}}
          initialCenter={position}>
          <Marker position={position} />
        </Map> */}
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

// export default GoogleApiWrapper({
//   apiKey: GOOGLE_MAPS_API
// })(GeoView);
export default withStacking(GeoView);
