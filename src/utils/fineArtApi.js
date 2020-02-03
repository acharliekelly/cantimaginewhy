// this should mimick the API return

const FAA_URL = 'https://charlie-kelly.pixels.com/';

const faaUrl = productKey => {
  if (productKey) {
    return `${FAA_URL}featured/${productKey}-charlie-kelly.html`;
  } else {
    return FAA_URL;
  }
  
}

// format: Cloudinary_ID: FAA product key
const faaProducts = {
    "art/public_garden_swan": "swan-pond" ,
    "art/seven_hills_park_hiiasw": "seven-hills-park",
    "art/sarah_mildred_long_bridge_kovgtu": "aerial-bridge",
    "art/buildings_n_stuff-fs": "buildings-n-stuff",
    "art/mit_sunset-fs": "mit-sunset",
    "art/portsmouth_terminal": "portsmouth-terminal",
    "art/norumbega_tower_daxl7b": "norumbega-tower",
    "art/memorial_drive_z68y3q": "memorial-drive",
    "art/lake_mansfield": "lake-mansfield",
    "art/gosport_harbor_avxocx": "gosport-harbor",
    "art/footbridge-watertown-dam_2019": "thomson-pedestrian-bridge",
    "art/fishing-fs": "fishing",
    "art/first_parish": "first-parish",
    "art/fall_footbridge": "fall-footbridge",
    "art/cambridge_common-fs": "cambridge-common",
    "art/cronins_landing": "cronins-landing",
    "art/eliot-bridge_2019": "eliot-bridge",
    "art/capitol-fs": "capitol",
    "art/boston-public-gardens-2": "public-gardens-2",
    "art/a_friday_in_september": "a-friday-in-september",
    "art/boston-public-gardens_2019.jpg": "boston-public-garden-1",
    "art/cambridge-hyatt_2019": "cambridge-hyatt",
    "art/fall_colors": "fall-colors",
    "art/early_fall_mt_feake": "mt-feake-cemetery-early-fall",
    "art/fox_park": "fox-park",
}

export const faaAvailable = cloudinaryId => {
  const key = faaProducts[cloudinaryId];
  return (key != null);
}

// returns FineArtAmerica URL for Cloudinary ID
export const faaLookup = cloudinaryId => {
  const key = faaProducts[cloudinaryId];
  return faaUrl(key);
};
