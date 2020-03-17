// albums.js
/**
 * Structure:
 * name
 * description
 * albums:
 * - name
 * - tag
 * - thumbnail
 * - description
 * - sortField
 */
export const albumGroups = [
  {
    "name": "Recent Work",
    "description": "Artwork completed since 2016",
    "albums": [
      {
        "name": "Plein Air",
        "tag": "en plein air",
        "thumbnail": "art/early_fall_mt_feake",
        "description": "Painted on site",
        "sortField": ".alb-order"
      },
      {
        "name": "Scenery",
        "tag": "scenery-new",
        "thumbnail": "art/midwinter",
        "description": "Painted from a photograph",
        "sortField": ".year"
      },
      {
        "name": "Portrait",
        "tag": "portrait-new",
        "thumbnail": "nfs/luthien-5",
        "description": "Recent attempts at portraiture",
        "sortField": ".alb-order"
      },
      // {
      //   "name": "Watchmen",
      //   "tag": "watchmen",
      //   "thumbnail": "nfs/watchmen",
      //   "description": "Suddenly inspired to draw some comic book characters",
      //   "sortField": ".alb-order"
      // },
      {
        "name": "Name Tags",
        "tag": "nametag",
        "thumbnail": "nfs/charlie-3_33523261796_o_njzr8m",
        "description": "Name tags I made for various people, mostly me",
        "sortField": ".year"
      },
      {
        "name": "Name Plates",
        "tag": "illumination",
        "thumbnail": "nfs/michele-cantara_2018",
        "description": "Like name tags, but bigger",
        "sortField": ".alb-order"
      },
    ]
  },
  {
    "name": "Older Work",
    "description": "Artwork completed between 2010 - 2015",
    "albums": [
      {
        "name": "Landscapes",
        "tag": "scenery-old",
        "thumbnail": "art/salisbury-pond_2011",
        "description": "Painted from a photograph",
        "sortField": ".year"
      },
      {
        "name": "Knotwork",
        "tag": "knotwork",
        "thumbnail": "art/lotus",
        "description": "Celtic-inspired artwork",
        "sortField": ".caption"
      },
      {
        "name": "People",
        "tag": "portrait-old",
        "thumbnail": "nfs/rihanna_26805063606_o_guugen",
        "description": "Sketches of people; some of them famous",
        "sortField": ".caption"
      },
      {
        "name": "Plaitwork",
        "tag": "plaitwork",
        "thumbnail": "nfs/mandelbrot-set",
        "description": "My first type of artwork; like knotwork, but with all right angles"
      },
      {
        "name": "Archive",
        "tag": "archive",
        "thumbnail": "nfs/ferry-beach-rock-painting_41932404964_o_lf4uhn",
        "description": "All the other stuff"
      }
    ]
  }
];

export const albums = [];
