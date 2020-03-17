// filters.js
/**
 * Structure:
 * name
 * description
 * options:
 * - name
 * - tag
 * - thumbnail
 * - description
 * - sortField
 */
export const filters = [
  {
    "name": "Location",
    "description": "Filter by where image was painted",
    "options": [
      {
        "name": "Boston",
        "tag": "downtown-boston",
        "thumbnail": "art/esplanade-sunset_2018",
        "description": "Scenes from Downtown Boston",
        "sortField": ".location"
      },
      {
        "name": "Cambridge",
        "tag": "cambridge",
        "thumbnail": "art/memorial_drive",
        "description": "Scenes from Cambridge",
        "sortField": ".location"
      },
      {
        "name": "Waltham",
        "tag": "waltham",
        "thumbnail": "art/early_fall_mt_feake",
        "description": "Scenes from Waltham",
        "sortField": ".location"
      },
      {
        "name": "Charles River",
        "tag": "charles-river",
        "thumbnail": "art/watertown_dam",
        "description": "Scenes from along the Charles",
        "sortField": ".location"
      },
      {
        "name": "Maine",
        "tag": "maine",
        "thumbnail": "art/parker_point",
        "description": "Scenes from Maine",
        "sortField": ".location"
      },
      {
        "name": "Elsewhere",
        "tag": "elsewhere",
        "thumbnail": "art/bodiam-castle_2011",
        "description": "Scenes from elsewhere",
        "sortField": ".location"
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
        "thumbnail": "art/winter-house",
        "description": "Graphite / Colored Pencil / WC Pencil",
        "sortField": ".caption"
      },
      {
        "name": "Watercolor Pencil",
        "tag": "watercolor pencil",
        "thumbnail": "art/leaving-star-island_2015",
        "description": "Drawn first, then turned into watercolor by applying water",
        "sortField": ".caption"
      },
      {
        "name": "Watercolor",
        "tag": "watercolor",
        "thumbnail": "art/late-spring-on-the-charles_2017",
        "description": "Traditional watercolor painting with brush",
        "sortField": ".caption"
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
    "name": "Surface",
    "description": "Filter by type of surface, as opposed to method",
    "options": [
      {
        "name": "Paper",
        "tag": "paper",
        "thumbnail": "art/leaving-star-island_2015",
        "description": "Drawn or painted on paper"
      },
      {
        "name": "Canvas",
        "tag": "canvas",
        "thumbnail": "art/fall_footbridge",
        "description": "Painted on canvas"
      },
      {
        "name": "Panel",
        "tag": "panel",
        "thumbnail": "art/autumn_woods",
        "description": "Painted on clay surface"
      },
    ]
  },
  {
    "name": "Style",
    "description": "Different artistic styles used",
    "options": [
      {
        "name": "Triptych",
        "tag": "triptych",
        "thumbnail": "art/winter-yosemite",
        "description": "Picture divided into multiple panels"
      },
      {
        "name": "Pointillist",
        "tag": "pointillist",
        "thumbnail": "art/fun-with-dots_2017",
        "description": "Created by making tiny dots instead of brush strokes"
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
        "thumbnail": "",
        "description": "Images with some amount of yellow in them"
      }
    ]
  },
  {
    "name": "Availability",
    "description": "Filter by availability of images for purchase or printing",
    "options": [
      {
        "name": "Original for Sale",
        "tag": "for-sale",
        "thumbnail": "art/memorial_drive",
        "description": "You can purchase these original paintings"
      },
      {
        "name": "Stuff for Sale",
        "tag": "for-print",
        "thumbnail": "art/esplanade-sunset_2018",
        "description": "You can buy stuff made from these pictures"
      },
      {
        "name": "Viewing Only",
        "tag": "nfs",
        "thumbnail": "nfs/eye_26745608572_o_zqbocw",
        "description": "You can look at these, but I have neither originals for sale, nor any derived products available for purchase."
      }
    ]
  }
]
