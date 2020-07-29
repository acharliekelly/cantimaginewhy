import React from 'react';
import PropTypes from 'prop-types';
// import { Map, Marker, GoogleApiWrapper, withGoogleMap, withScriptjs } from 'google-maps-react';
import MapButton from '../Buttons/MapButton';
import { getMapLink } from '../../utils/geoUtils';
import { withStacking } from '../higherOrder/withStacking';
// import { GOOGLE_MAPS_API } from '../../utils/geoUtils';
import { Image } from 'cloudinary-react';



// const GeoView = withScriptjs(withGoogleMap((props) => {
const GeoView = props => {
  // const [ position, setPosition ] = useState(null);
  const { available, latitude, longitude } = props;

  if (available) {
    const mapStyle = {
      border: '2px ridge #06074b', 
      borderRadius: '0.2rem', 
      margin: '2rem auto', 
      cursor: 'pointer'
    }

    return (
      <div className="geo-placeholder">
        <a target="_blank" rel="noopener noreferrer" href={getMapLink(latitude, longitude)}>
          <Image 
            publicId="icon/gmap" 
            title="Click to view location in Google Maps"
            style={mapStyle}
            />
        </a>
        <br/>
        <MapButton variant="outline-secondary" latitude={latitude} longitude={longitude} />
        
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
