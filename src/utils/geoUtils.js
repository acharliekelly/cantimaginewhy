// temporary lookup
// ultimately use .geotag field from Cloudinary
import { geotags } from '../json/locations';



export const lookupGeo = publicId => {
  if (geotags[publicId]) {
    return geotags[publicId];
  } else {
    return false;
  }
}

export const extractGeo = geotag => {
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

export const getMapLink = (latitude, longitude) => {
  let url = 'https://www.google.com/maps/search/?api=1&map_action=map&basemap=satellite&zoom=11';
  return `${url}&query=${latitude},${longitude}`;
}


