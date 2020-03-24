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
  "art/a_friday_in_september": "a-friday-in-september",
  "art/autumn-at-mt-feake_2017": "autumn-at-mt-feake",
  "art/autumn_woods": "autumn-woods",
  "art/beaver_brook_north": "beaver-brook-north",
  "art/boston-public-gardens": "boston-public-garden-1",
  "art/boston-public-gardens-2": "public-gardens-2",
  "art/boston_nightscape": "boston-nightscape",
  "art/boston_skyline": "boston-skyline",
  "art/buildings_n_stuff-fs": "buildings-n-stuff",
  "art/cambridge-hyatt": "cambridge-hyatt",
  "art/cambridge-night": "cambridge-skyline",
  "art/capitol-fs": "capitol",
  "art/cronins_landing": "cronins-landing",
  "art/early_fall_mt_feake": "mt-feake-cemetery-early-fall",
  "art/eliot-bridge_2019": "eliot-bridge",
  "art/esplanade-sunset_2018": "esplanade",
  "art/fall_colors": "fall-colors",
  "art/fall_footbridge": "fall-footbridge",
  "art/first_parish": "first-parish",
  "art/fishing-fs": "fishing",
  "art/footbridge-watertown-dam": "thomson-pedestrian-bridge",
  "art/fox_park": "fox-park",
  "art/gosport_harbor": "gosport-harbor",
  "art/hatch_esplanade": "esplanade-looking-east",
  "art/herter_birch": "herter-birch",
  "art/herter-park_2019": "herter-park",
  "art/lake_mansfield": "lake-mansfield",
  "art/longfellow_night": "longfellow-bridge-at-night",
  "art/memorial_drive": "memorial-drive",
  "art/midwinter": "midwinter",
  "art/mit_sunset": "mit-sunset",
  "art/norumbega_tower": "norumbega-tower",
  "art/portsmouth_terminal": "portsmouth-terminal",
  "art/public_garden_swan": "swan-pond",
  "art/riparian_balcony": "riparian-balcony",
  "art/salt_pond": "salt-pond",
  "art/sarah_mildred_long_bridge": "aerial-bridge",
  "art/seven_hills_park": "seven-hills-park",
  "art/tea_crabapple_tree": "tea-crabapple-tree",
  "art/waltham_waterfall": "waterfall",
  "art/watertown_dam": "watertown-dam",
  "art/willow": "willow",
  "art/winter_walk": "winter-walk"
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
