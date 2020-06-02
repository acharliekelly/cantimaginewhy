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
 * - sortDir: direction - 
 */

export const albums = [
  {
    "name": "Plein Air",
    "tag": "plein-air-acrylic",
    "thumbnail": "art/a_friday_in_september",
    "description": "Painted on site",
    "sortField": ".completed",
    "sortDir": "desc"
  },
  {
    "name": "Scenery",
    "tag": "scenery-loc",
    "thumbnail": "art/midwinter",
    "description": "From a photograph I took",
    "sortField": ".year",
    "sortDir": "desc"
  },
  {
    "name": "Landscape",
    "tag": "scenery-noloc",
    "thumbnail": "nfs/the_cliffs",
    "description": "From a photograph somebody took",
    "sortField": ".year",
    "sortDir": "desc"
  },
  {
    "name": "Sketch",
    "tag": "sketch",
    "thumbnail": "nfs/davis-t",
    "description": "Onsite pencil sketches of local landmarks",
    "sortField": ".completed",
    "sortDir": "desc"
  },
  {
    "name": "Name Tags",
    "tag": "nametag",
    "thumbnail": "nfs/charlie-7_37671079756_o_fvboho",
    "description": "Name tags I made for various people, including me",
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
    "name": "Cards",
    "tag": "cards",
    "thumbnail": "art/st-patricks-day-card-2011",
    "description": "Designs for various holidays and special occaisions",
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
    "name": "People",
    "tag": "portrait",
    "thumbnail": "nfs/rihanna",
    "description": "Sketches of people; some of them famous",
    "sortField": ".year",
    "sortDir": "desc"
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
10 years or so, grouped by album. A lot of my older work doesn't have any other information,
such as Year or Medium, so it can't be easily filtered. For the ones that can be filtered,
there's a Filter button on the left.`;
