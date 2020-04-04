// temporary lookup
// ultimately use .geotag field from Cloudinary
const geotags = {
// plein-air-acrylic
"art/first_parish": "42.3776586,-71.2347889",
"art/cronins_landing": "42.3727778,-71.2352778",
"art/fall_footbridge": "42.3652778,-71.1888889",
"art/fall_colors": "42.3697414,-71.2238664",
"art/waltham_waterfall": "42.3687708,-71.2230319",
"art/autumn_woods": "42.3648008,-71.2128357",
"art/public_garden_swan": "42.3523651,-71.0694239",
"art/lake_mansfield": "42.2004799,-73.3687122",
"art/portsmouth_terminal": "43.05961,-70.8037718",
"art/boston_nightscape": "",
"art/early_fall_mt_feake": "42.3748201,-71.245658",
"art/a_friday_in_september": "42.3540753,-71.079559",
"art/memorial_drive": "42.3717499,-71.1243444",
"art/hatch_shell_east": "42.3584157,-71.0733127",
"art/seven_hills_park": "42.3969232,-71.1237041",
"art/gosport_harbor": "42.9759378,-70.6118969",
"art/norumbega_tower": "42.3531932,-71.2620442",
"art/tea_crabapple_tree": "42.353486,-71.0706956",
"art/sarah_mildred_long_bridge": "43.08,-70.7602778",
"art/herter_birch": "42.3673767,-71.1337498",
"art/dunster": "42.3681312,-71.1209535",
"art/caterpillar_hill": "44.3232781,-68.6760259",
"art/parker_point": "44.4104813,-68.588235",
"art/riparian_balcony": "42.3712006,-71.2256995",
"art/watertown_dam": "42.3652464,-71.1892942",
"art/buildings_n_stuff": "42.3541695,-71.0691739",
"art/fishing": "42.364479,-71.2153778",
"art/cambridge_common": "42.3759351,-71.1202542",
"art/hatch_esplanade": "42.3561213,-71.0727945",
"art/capitol": "42.3603537,-71.0844482",
"art/longfellow_night": "42.3558852,-71.0776108",
"art/mit_sunset": "42.356097,-71.0765603",
"art/herter-park_2019": "42.3671303,-71.1347623",
"art/jfk-memorial-park": "42.3697463,-71.1234886",
"art/footbridge-watertown-dam": "42.3656105,-71.189271",
"art/charles-river-watertown": "",
"art/eliot-bridge": "42.3721311,-71.1338555",
"art/cambridge-hyatt": "42.3517475,-71.1019996",
"art/boston-skyline_2019": "42.3599051,-71.0857115",
"art/cambridge-night": "",
"art/boston-public-gardens-2": "42.3546911,-71.0703416",
"art/boston-public-gardens": "42.3534111,-71.0712516",
"art/beaver-brook-north": "42.4042622,-71.1977948",

// scenery
"art/salt-pond": "",
"art/rainbow-end_2017": "",
"art/fox_park": "",
"art/wachusett-reservoir": "",
"art/star-island-obelisk": "",
"art/the-watch-factory": "",
"art/sunset-at-fishers-island_2016": "",
"art/star-island-lighthouse_2015": "",
"art/salisbury-pond-2015": "",
"nfs/rural-cemetery": "",
"art/salisbury-pond_2011": "",
"art/reflections_2012": "",
"art/railroad-bridge_2016": "",
"art/leaving-star-island_2015": "",
"art/late-spring-on-the-charles_2017": "",
"art/not-dunster_2018": "",
"art/fishers-island-deck_2016": "",
"art/esplanade-sunset_2018": "",
"art/exiting-osborn_2015": "",
"art/ferry-beach_2017": "",
"art/double-rainbow_2017": "",
"art/boston-tetraptych_2012": "",
"art/13-montvale-road_2012": "",
};

const entered = {
  // sketch
"art/fun-with-dots_2017": "42.3673738,-71.2165507",
"art/autumn-at-mt-feake_2017": "42.3622505,-71.2486279",
"art/bartholomews-cobble_2017": "42.054482,-73.3706998",
"nfs/1705-mass-ave": "42.383298,-71.119737",
"nfs/11-linden-pl": "42.3348672,-71.118384",
"nfs/31-parker-point": "44.4098775,-68.5892779",
"nfs/cambridge-green": "42.3766994,-71.1205097",
"nfs/coolidge-corner": "42.3418816,-71.1215331",
"nfs/christian-science-plaza": "42.345444,-71.082619",
"nfs/davis-sq-rite-aid": "42.395445,-71.120249",
"nfs/herter-park": "42.366868,-71.135340",
"nfs/costa-lopez-taylor-park": "42.3664604,-71.0793043",
"nfs/davis-square": "42.3962404,-71.1223897",
"nfs/davis-t": "42.3968355,-71.1226934",
"nfs/longfellow-bridge": "42.3541287,-71.0799178",
"nfs/sand-beach-acadia": "44.329233,-68.181748",
"nfs/grace-episcopal-wall": "42.353444,-71.183007",
"nfs/magazine-beach-park": "42.355123,-71.115258",
"nfs/winthrop-square": "42.3725215,-71.1202975",
"nfs/lewis-wharf": "42.3636192,-71.0494836",
"nfs/portsmouth-aerial-bridge": "43.0807916,-70.7598036",
"nfs/wall-sculpture-in-waltham-municipal-bldg": "",
"nfs/lotta-fountain": "42.3556658,-71.0765618",
"art/midwinter": "42.3673738,-71.2165507",
}

export const lookupGeo = publicId => {
  if (geotags[publicId]) {
    return geotags[publicId];
  } else if (entered[publicId]) {
    return entered[publicId];
  } else {
    return false;
  }
}

