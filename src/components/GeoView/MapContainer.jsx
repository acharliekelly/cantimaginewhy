import React, { memo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API } from 'Api/googleMapsApi';

const containerStyle = {
  width: '90%',
  height: '90%'
}

const MapContainer = props => {
  const { position, label } = this.props;

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={14}
      >
        <Marker position={position} label={label} />

      </GoogleMap>
    </LoadScript>
  )
};

export default memo(MapContainer);

