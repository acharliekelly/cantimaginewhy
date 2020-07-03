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
    "sortDir": "desc",
    "display": true
  },
  {
    "name": "Scenery",
    "tag": "scenery-loc",
    "thumbnail": "art/midwinter",
    "description": "From a photograph I took",
    "sortField": ".year",
    "sortDir": "desc",
    "display": true
  },
  {
    "name": "Landscape",
    "tag": "scenery-noloc",
    "thumbnail": "nfs/the_cliffs",
    "description": "From a photograph somebody took",
    "sortField": ".year",
    "sortDir": "desc",
    "display": false
  },
  {
    "name": "Sketch",
    "tag": "sketch",
    "thumbnail": "nfs/davis-t",
    "description": "Onsite pencil sketches of local landmarks",
    "sortField": ".completed",
    "sortDir": "desc",
    "display": true
  },
  {
    "name": "Name Tags",
    "tag": "nametag",
    "thumbnail": "nfs/charlie-7_37671079756_o_fvboho",
    "description": "Name tags I made for various people, including me",
    "sortField": ".year",
    "display": true
  },
  {
    "name": "Name Plates",
    "tag": "illumination",
    "thumbnail": "nfs/emrys_2011",
    "description": "Like name tags, but bigger",
    "sortField": ".alb-order",
    "display": true
  },
  {
    "name": "Knotwork",
    "tag": "knotwork",
    "thumbnail": "art/lotus",
    "description": "Celtic-inspired artwork",
    "sortField": ".caption",
    "display": true
  },
  {
    "name": "Cards",
    "tag": "cards",
    "thumbnail": "art/st-patricks-day-card-2011",
    "description": "Designs for various holidays and special occaisions",
    "sortField": '.year',
    "display": true
  },
  {
    "name": "AANE",
    "tag": "aane",
    "thumbnail": "nfs/golden",
    "description": "A series of the letters A-A-N-E, arranged artistically",
    "sortField": ".alb-order",
    "display": false
  },
  {
    "name": "People",
    "tag": "portrait",
    "thumbnail": "nfs/rihanna",
    "description": "Sketches of people; some of them famous",
    "sortField": ".year",
    "sortDir": "desc",
    "display": true
  },
  {
    "name": "Plaitwork",
    "tag": "plaitwork",
    "thumbnail": "nfs/lattice_mandelbrot-set",
    "description": "My first type of artwork; like knotwork, but with all right angles. Looks like placemats.",
    "sortField": ".completed",
    "display": true
  },
  {
    "name": "Archive",
    "tag": "archive",
    "thumbnail": "nfs/ferry-beach-rock-painting_41932404964_o_lf4uhn",
    "description": "All the other stuff I've made",
    "display": true
  },
  {
    "name": "Logos",
    "tag": "cant-imagine",
    "thumbnail": "icon/ciw9",
    "description": "Logos designs",
    "sortField": ".completed",
    "display": false
  }
];

export const navDescription = `This is my entire collection of artwork from the past 
10 years or so, grouped by album. A lot of my older work doesn't have any other information,
such as Year or Medium, so it can't be easily filtered. For the ones that can be filtered,
there's a Filter button on the left.`;
