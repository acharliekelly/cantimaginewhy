import React from 'react';
import { 
  Map, 
  Marker, 
  GoogleApiWrapper
} from 'google-maps-react';
import { GOOGLE_MAPS_API } from 'Api/googleMapsApi';

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends React.Component {
  render() {
    const { google, position, name } = this.props;
    return (
      <Map 
        google={google} 
        zoom={14}
        style={style}
        initialCenter={position}
      >
        <Marker name={name} position={position} />

      </Map>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API
})(MapContainer);



