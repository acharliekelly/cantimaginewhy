// albums.js
/**
 * Basic navigation object:
 * - name: Title
 * - tag: search slug for request
 * - thumbnail: example image
 * - description: descriptive text
 * - sortField: field to sort results on
 *   - 'field' = item.field
 *   - '.field' = item.context.custom.field
 */

export const albums = [
  {
    "name": "Plein Air",
    "tag": "plein-air-acrylic",
    "thumbnail": "art/a_friday_in_september",
    "description": "Painted on site",
    "sortField": ".completed"
  },
  {
    "name": "Scenery",
    "tag": "scenery-loc",
    "thumbnail": "art/midwinter",
    "description": "From a photograph I took",
    "sortField": ".year"
  },
  {
    "name": "Landscape",
    "tag": "scenery-noloc",
    "thumbnail": "art/bodiam-castle_2011",
    "description": "From a photograph somebody took",
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
    "name": "Logos",
    "tag": "logo",
    "thumbnail": "ciw4",
    "description": "Different logos I've made, either as monograms or specifically for this site",
    "sortField": ".alb-order"
  },
  {
    "name": "Sketch",
    "tag": "sketch",
    "thumbnail": "nfs/davis-t",
    "description": "Onsite pencil sketches of local landmarks",
    "sortField": ".completed"
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
    "name": "AANE",
    "tag": "aane",
    "thumbnail": "nfs/golden",
    "description": "A series of the letters A-A-N-E, arranged artistically",
    "sortField": ".alb-order"
  },
  {
    "name": "Celebrities",
    "tag": "portrait-old",
    "thumbnail": "nfs/rihanna",
    "description": "Sketches of people; some of them famous",
    "sortField": ".caption"
  },
  {
    "name": "Plaitwork",
    "tag": "plaitwork",
    "thumbnail": "nfs/lattice_mandelbrot-set",
    "description": "My first type of artwork; like knotwork, but with all right angles. Looks like placemats.",
    "sortField": ".completed"
  },
  {
    "name": "Archive",
    "tag": "archive",
    "thumbnail": "nfs/ferry-beach-rock-painting_41932404964_o_lf4uhn",
    "description": "All the other stuff I've made"
  }
];

export const navDescription = `This is my entire collection of artwork from the past 
10 years or so, grouped by album. A lot of it doesn't have any other information,
such as Year or Title, so it can't be easily filtered.`;
