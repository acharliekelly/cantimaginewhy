// filters.js
/**
 * Structure:
 * name
 * description
 * display: (apply to children)
 * options:
 * - name
 * - tag
 * - thumbnail
 * - description
 * - sortField
 */
export const filters = [
  {
    "name": "Subject",
    "description": "Filter by subject matter",
    "options": [
      {
        "name": "Places",
        "tag": "subj-place",
        "thumbnail": "nfs/the_cliffs",
        "description": "Pictures of places",
        "sortField": ".completed",
        "sortDir": "desc"
      },
      {
        "name": "Animals",
        "tag": "subj-animals",
        "thumbnail": "nfs/amelia_2011",
        "description": "Pictures of animals",
        "sortField": ".year",
      },
      {
        "name": "Plants",
        "tag": "subj-flowers",
        "thumbnail": "nfs/back-pink_flower",
        "description": "Flowers, fruit, etc.",
        "sortField": ".completed",
        "sortDir": "desc"
      },     
      {
        "name": "People",
        "tag": "subj-people",
        "thumbnail": "nfs/mlk4",
        "description": "Pictures of people",
        "sortField": ".year",
        "sortDir": "desc"
      },
      // {
      //   "name": "Abstract",
      //   "tag": "subj-abstract",
      //   "thumbnail": "art/knotwork_square_2",
      //   "description": "Abstract shapes & designs",
      //   "sortField": ".year",
      //   "sortDir": "desc"
      // },
      {
        "name": "Political",
        "tag": "subj-politic",
        "thumbnail": "nfs/blm-wakanda",
        "description": "Inspired by current events",
        "sortField": ".completed",
        "sortDir": "desc"
      },
      {
        "name": "Text",
        "tag": "subj-text",
        "thumbnail": "nfs/jl42",
        "description": "Artistic renderings of letters",
        "sortField": ".year",
        "sortDir": "desc"
      },
      // {
      //   "name": "Love",
      //   "tag": "eros",
      //   "thumbnail": "nfs/susanna-valentine",
      //   "description": "Inspired by love",
      //   "sortField": ".completed"
      // }
      {
        "name": "Hobbies",
        "tag": "subj-hobby",
        "thumbnail": "nfs/remy-springer_2015",
        "description": "Depictions of hobbies",
        "sortField": ".caption",
      }
    ]
  },
  {
    "name": "Location",
    "description": "Filter by the location of the thing being depicted",
    "options": [
      {
        "name": "Boston",
        "tag": "downtown-boston",
        "thumbnail": "art/esplanade-sunset_2018",
        "description": "Scenes from Downtown Boston",
        "sortField": ".completed"
      },
      {
        "name": "Cambridge",
        "tag": "cambridge",
        "thumbnail": "art/memorial_drive",
        "description": "Scenes from Cambridge",
        "sortField": ".completed"
      },
      {
        "name": "Waltham",
        "tag": "waltham",
        "thumbnail": "art/early_fall_mt_feake",
        "description": "Scenes from Waltham",
        "sortField": ".completed"
      },
      {
        "name": "Charles River",
        "tag": "charles-river",
        "thumbnail": "art/watertown_dam",
        "description": "Scenes from along the Charles",
        "sortField": ".completed",
        "sortDir": "desc"
      },
      {
        "name": "Maine",
        "tag": "maine",
        "thumbnail": "art/parker_point",
        "description": "Scenes from Maine",
        "sortField": ".completed"
      },
      {
        "name": "Elsewhere",
        "tag": "elsewhere",
        "thumbnail": "art/bodiam-castle_2011",
        "description": "Scenes from farther afield",
        "sortField": ".completed"
      }
    ]
  },
  {
    "name": "Style",
    "description": "Filter by artistic style",
    "options": [
      {
        "name": "Pointillist",
        "tag": "pointillist",
        "thumbnail": "art/fun-with-dots_2017",
        "description": "Created by making tiny dots instead of brush strokes"
      },
      {
        "name": "Triptych",
        "tag": "triptych",
        "thumbnail": "nfs/winter-yosemite",
        "description": "Picture divided into multiple panels"
      },
      {
        "name": "Nightscape",
        "tag": "nightscape",
        "thumbnail": "art/cambridge-night",
        "description": "Scenes from after dark, painted on black background"
      },
      {
        "name": "Miniatures",
        "tag": "miniature",
        "thumbnail": "art/caterpillar_hill",
        "description": "Original is less than 6 inches on one side"
      },
      {
        "name": "Panoramic",
        "tag": "panorama",
        "thumbnail": "art/winter-moon-2",
        "description": "Long and thin"
      },
      {
        "name": "Monogram",
        "tag": "monogram",
        "thumbnail": "icon/ck-gothic_monogram",
        "description": "Artistic arrangements of letters that don't spell anything",
        "sortField": ".year"
      },
      {
        "name": "Rocks",
        "tag": "painted-rock",
        "thumbnail": "nfs/sunset_slate_rock",
        "description": "Painted rocks",
        "sortField": ".alb-order"
      }
    ]
  },
  {
    "name": "Season",
    "description": "Filter by what season the image comes from",
    "options": [
      {
        "name": "Summer",
        "tag": "summer",
        "thumbnail": "art/salt-pond",
        "description": "Summer scenes"
      },
      {
        "name": "Fall",
        "tag": "autumn",
        "thumbnail": "art/autumn-at-mt-feake_2017",
        "description": "Fall scenes"
      },
      {
        "name": "Winter",
        "tag": "winter",
        "thumbnail": "art/winter-walk",
        "description": "Winter scenes"
      },
      {
        "name": "Spring",
        "tag": "spring",
        "thumbnail": "art/esplanade-sunset_2018",
        "description": "Spring scenes"
      }
    ]
  },
  {
    "name": "Period",
    "description": "Filter by (my) historical period",
    "options": [
      {
        "name": "Partnered",
        "tag": "era-melrose",
        "thumbnail": "nfs/susanna-valentine",
        "description": "February 2021 - ?",
        "sortField": ".completed"
      },
      {
        "name": "Quarantine",
        "tag": "era-quarantine",
        "thumbnail": "nfs/ty4",
        "description": "Didn't get out much: 2020 - 21",
        "sortField": ".completed"
      },
      {
        "name": "Outdoors",
        "tag": "era-current",
        "thumbnail": "art/waltham_waterfall",
        "description": "Summer 2019 - Spring 2020",
        "sortField": ".completed"
      },
      {
        "name": "Middle",
        "tag": "era-recent",
        "thumbnail": "nfs/winthrop-square",
        "description": "2015 - 2019"
      },
      {
        "name": "Sabbatical",
        "tag": "sabbatical",
        "thumbnail": "nfs/winter-yosemite",
        "description": "Limited access to materials: 2013-15"
      },
      {
        "name": "Early Work",
        "tag": "early-work",
        "thumbnail": "nfs/orangerie",
        "description": "Expanding horizons: 2010-2012"
      },
      {
        "name": "Learning",
        "tag": "era-learning",
        "thumbnail": "nfs/lattice_prism",
        "description": "Learning to draw: 2009-10"
      }
    ]
  },
  {
    "name": "Medium",
    "description": "Filter by method (pencil, watercolor, etc)",
    "options": [
      {
        "name": "Graphite",
        "tag": "graphite",
        "thumbnail": "nfs/christian-science-plaza",
        "description": "Regular old pencil",
        "sortField": ".year"
      },
      {
        "name": "Colored Pencil",
        "tag": "colored-pencil",
        "thumbnail": "nfs/winter-yosemite",
        "description": "Colored Pencil",
        "sortField": ".year"
      },
      {
        "name": "WC Pencil",
        "tag": "watercolor pencil",
        "thumbnail": "art/leaving-star-island_2015",
        "description": "First drawn with dry pigment, then painted with water to create watercolor",
        "sortField": ".year"
      },
      {
        "name": "Watercolor",
        "tag": "watercolor",
        "thumbnail": "art/late-spring-on-the-charles_2017",
        "description": "Traditional watercolor painting",
        "sortField": ".year"
      },
      {
        "name": "Acrylic",
        "tag": "acrylic",
        "thumbnail": "art/riparian_balcony",
        "description": "Layered acrylic paints",
        "sortField": ".year"
      }
    ]
  },
  {
    "name": "Availability",
    "description": "Filter by availability of images for purchase or printing",
    "options": [
      {
        "name": "Original",
        "tag": "for-sale",
        "thumbnail": "art/memorial_drive",
        "description": "Original painting is available"
      },
      {
        "name": "Prints, etc",
        "tag": "for-print",
        "thumbnail": "art/esplanade-sunset_2018",
        "description": "Buy products made from these"
      },
      {
        "name": "View",
        "tag": "nfs",
        "thumbnail": "nfs/lattice_eye",
        "description": "You can look at these"
      }
    ]
  }
];

export const navDescription = `
I created this filtering system in order to... OK, it was just fun. Not everything has be for 
some useful purpose, you know? Anyway, you can filter by the categories on the top row. The bottom
row is all the options for that category, each with a thumbnail that probably came from that grouping. 
Clicking a thumbnail will show you all the artwork that, in my personal, arbitrary opinion, 
belongs to that option. The Browse by Album button on the left will let you see all of my albums.`;
