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
 * - display []
 */
export const filters = [
  {
    "name": "Location",
    "description": "Filter by where image was painted",
    "display": [
      "gallery", "detail", "progress", "explan"
    ],
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
        "sortField": ".completed"
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
    "display": [
      "gallery", "detail"
    ],
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
        "thumbnail": "art/winter-yosemite",
        "description": "Picture divided into multiple panels"
      },
      {
        "name": "Nightscape",
        "tag": "nightscape",
        "thumbnail": "art/cambridge-night",
        "description": "Scenes from after dark, painted on black canvas"
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
        "name": "Plein Air",
        "tag": "en plein air",
        "thumbnail": "art/early_fall_mt_feake",
        "description": "Painted on site, instead of from a photo"
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
    "name": "Color",
    "description": "Filter by which colors appear dominant in the image",
    "options": [
      {
        "name": "Blue",
        "tag": "blue",
        "thumbnail": "art/shamrock_1",
        "description": "Images with the color blue in them"
      },
      {
        "name": "Green",
        "tag": "green",
        "thumbnail": "art/lotus",
        "description": "Images with the color green in them"
      },
      {
        "name": "Red",
        "tag": "red",
        "thumbnail": "art/winter-holidays-card-2015",
        "description": "Images with some version of red in them"
      },
      {
        "name": "Yellow",
        "tag": "yellow",
        "thumbnail": "art/easter-card-2012",
        "description": "Images with some amount of yellow in them"
      }
    ]
  },
  {
    "name": "Era",
    "description": "Filter by when the piece was completed",
    "options": [
      {
        "name": "Learning",
        "tag": "era-learning",
        "thumbnail": "nfs/lattice_prism",
        "description": "Learning to draw: 2009-10"
      },
      {
        "name": "Early Work",
        "tag": "early-work",
        "thumbnail": "nfs/orangerie",
        "description": "Expanding horizons: 2010-2012"
      },
      {
        "name": "Sabbatical",
        "tag": "sabbatical",
        "thumbnail": "nfs/winter-yosemite",
        "description": "Limited access to materials: 2013-15"
      },
      {
        "name": "Recent",
        "tag": "era-recent",
        "thumbnail": "nfs/winthrop-square",
        "description": "Recent past: 2015-19"
      },
      {
        "name": "Current",
        "tag": "era-current",
        "thumbnail": "art/waltham_waterfall",
        "description": "Summer 2019 - Present",
        "sortField": ".completed"
      }
    ]
  },
  {
    "name": "Medium",
    "description": "Filter by method (pencil, watercolor, etc)",
    "options": [
      {
        "name": "Pencil",
        "tag": "pencil",
        "thumbnail": "nfs/christian-science-plaza",
        "description": "Graphite / Colored Pencil",
        "sortField": ".caption"
      },
      {
        "name": "WC Pencil",
        "tag": "watercolor pencil",
        "thumbnail": "art/leaving-star-island_2015",
        "description": "First drawn with watercolor pencil, then painted with water to create watercolor",
        "sortField": ".caption",
        "display": [ "-progress", "-explan" ]
      },
      {
        "name": "Watercolor",
        "tag": "watercolor",
        "thumbnail": "art/late-spring-on-the-charles_2017",
        "description": "Traditional watercolor painting with brush",
        "sortField": ".caption",
        "display": [ "-progress", "-explan" ]
      },
      {
        "name": "Acrylic",
        "tag": "acrylic",
        "thumbnail": "art/riparian_balcony",
        "description": "Layered acrylic paints",
        "sortField": ".caption"
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
        "thumbnail": "nfs/eye_26745608572_o_zqbocw",
        "description": "You can look at these"
      }
    ]
  }
];

export const navDescription = `
I've devised this filtering system in an attempt to make my artwork more searchable. 
On the top row are categories you can group by, such as medium 
(eg. pencil, watercolor), or location (Boston, Maine). When you click one of the image buttons
(eg 'Boston'), you'll see all my paintings from Downtown Boston.`;
