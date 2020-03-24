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
        "tag": "scenery",
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
      {
        "name": "Name Tags",
        "tag": "nametag",
        "thumbnail": "nfs/charlie-7_37671079756_o_fvboho",
        "description": "Name tags I made for various people, mostly me",
        "sortField": ".year"
      },
      {
        "name": "Name Plates",
        "tag": "illumination",
        "thumbnail": "nfs/emrys_2011",
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
        "name": "Holiday",
        "tag": "holiday",
        "thumbnail": "art/st-patricks-day-card-2011",
        "description": "Designs for holiday cards",
        "sortField": '.year'
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
  },
  {
    "name": "Representational",
    "description": "Artwork that's supposed to look like something real",
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
        "tag": "portrait",
        "thumbnail": "nfs/sister_night",
        "description": "Attempts at drawing people",
        "sortField": ".alb-order"
      },
    ]
  },
  {
    "name": "Non-Representational",
    "description": "Abstract art, designs, monograms, and calligraphy",
    "albums": [
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
      {
        "name": "Logos",
        "tag": "logo",
        "thumbnail": "ciw3",
        "description": "Logos and Monograms",
        "sortField": ".alb-order"
      },
      {
        "name": "Knotwork",
        "tag": "knotwork",
        "thumbnail": "art/lotus",
        "description": "Celtic-inspired artwork",
        "sortField": ".caption"
      },
      {
        "name": "Plaitwork",
        "tag": "plaitwork",
        "thumbnail": "nfs/mandelbrot-set",
        "description": "My first type of artwork; like knotwork, but with all right angles"
      },
    ]
  },
];

export const albums = [];

export const navDescription = `
I've got a lot of artwork, and it's kind of hard to sort through. I've put things in albums
based on criteria that made sense to me at the time. `;
