// processUtils.js

const processData = {
  "caterpillar_hill": 4,
  "charles_river": 0,
  "capitol": 2,
  "cambridge_hyatt": 5,
  "cronins_landing": 0,
  "buildings_n_stuff": 4,
  "bpg_hancock": 6,
  "eliot_bridge": 0,
  "fall_mt_feake": 3,
  "fall_colors": 2,
  "first_parish": 2,
  "fall_footbridge": 4,
  "autumn_woods": 1,
  "riparian_balcony": 1,
  "swan_pond": 5,
  "september_esplanade": 6,
  "waltham_waterfall": 8,
  "seven_hills_park": 0,
  "norumbega_tower": 2,
  "memorial_drive": 4,
  "gosport_harbor": 3,
  "portsmouth": 0,
  "hatch_shell_east": 0,
  "herter_birch": 3,
  "watertown_dam": 3,
  "tea_crabapple": 2,
  "beaver_brook": 2,
  "cambridge_common": 0,
  "parker_point": 9,
  "jfk_park": 0,
  "mit_sunset": 0,
  "footbridge": 3,
  "herter": 0,
  "public_garden_2": 3,
  "dunster": 1,
  "longfellow_night": 0,
  "skyline": 0
};

/**
 * Returns array of cpi strings
 * @param {str} referenceKey 
 * @param {int} imageCount 
 */
const imageSeries = (referenceKey, imageCount) => {
  const series = [];
  const imgStr = `photos/onsite-${referenceKey}-`;
  series.push(imgStr + 'view');
  for (let i = 1; i <= imageCount; i++) {
    series.push(imgStr + i);
  }
  series.push(imgStr + 'final');
  return series;
}

export const lookupSeriesCount = referenceKey => {
  return processData[referenceKey] || -1;
}

export const getSeries = referenceKey => {
  if (Object.keys(processData).includes(referenceKey)) {
    const count = processData[referenceKey];
    return imageSeries(referenceKey, count);
  } else {
    return null;
  }
}
