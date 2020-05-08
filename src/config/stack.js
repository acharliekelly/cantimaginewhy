/**
 * Stack Panel: []
 *  - keyName: (string) eventKeyName
 *  - variant: (string)
 *  - title: (string) cardTitle
 *  - level: (int) distance from top of selection tree,
 *  - order: (int) order on level
 *  - component: (String) name of component
 *  - preStacked: (bool) component already fits into stack (otherwise requires withStacking)
 *  - dependency: (string) only display if props[dependency] exists
 */
export const stackPanels = [
  {
    "keyName": "albums",
    "variant": "primary",
    "title": "Albums",
    "level": 0,
    "order": 0,
    "component": "MobileNav",
    "preStacked": true,
    "dependency": "updateSelectNav",
    "help": `Select an album to browse`
  },
  {
    "keyName": "about",
    "variant": "secondary",
    "title": "About Album",
    "level": 1,
    "order": 0,
    "component": "Explan",
    "preStacked": true,
    "dependency": "albumAbout",
    "help": `Background information about this album`
  },
  {
    "keyName": "gallery",
    "variant": "secondary",
    "title": "Gallery",
    "level": 1,
    "order": 1,
    "component": "ThumbGallery",
    "preStacked": false,
    "dependency": "tagObject",
    "help": `Thumbnails of every image in this album.`
  },
  {
    "keyName": "display",
    "variant": "info",
    "title": "Display Image",
    "level": 2,
    "order": 0,
    "component": "DisplayImagePanel",
    "preStacked": true,
    "dependency": "imageIndex",
    "help": `The currently selected image, and all available information about it.`
  },
  {
    "keyName": "progress",
    "variant": "success",
    "title": "Artistic Process",
    "level": 3,
    "order": 0,
    "component": "ProgressView",
    "preStacked": true,
    "dependency": "refKey",
    "help": `Series of photos documenting the creative process, from initial view to finished product.`
  },
  {
    "keyName": "geo",
    "variant": "warning",
    "title": "Location",
    "level": 3,
    "order": 1,
    "component": "GeoView",
    "preStacked": true,
    "dependency": "geoTag",
    "help": `Coming Soon: A map inside this box. For now, click the button to open map in a new tab.`
  },
  
]
