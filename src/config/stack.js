/**
 * Stack Layout: []
 *  - keyName: (string) eventKeyName
 *  - variant: (string)
 *  - title: (string) cardTitle
 *  - level: (int) distance from top of selection tree
 *  - component: (String) name of component
 *  - preStacked: (bool) component already fits into stack (otherwise requires withStacking)
 *  - dependency: (string) only display if this props[dependency] exists
 *  - properties: { propName: stateVar } additional properties to be passed
 */
export const stackLayout = [
  {
    "keyName": "albums",
    "variant": "primary",
    "title": "Albums",
    "level": 0,
    "component": "MobileNav",
    "preStacked": true,
    "dependency": "updateSelectNav",
  },
  {
    "keyName": "about",
    "variant": "secondary",
    "title": "About Album",
    "level": 1,
    "component": "Explan",
    "preStacked": true,
    "dependency": "albumAbout",
    "properties": { "fullText": "albumAbout" }
  },
  {
    "keyName": "gallery",
    "variant": "secondary",
    "title": "Gallery",
    "level": 1,
    "component": "ThumbGallery",
    "preStacked": false,
    "dependency": "tagObject"
  },
  {
    "keyName": "display",
    "variant": "info",
    "title": "Display Image",
    "level": 2,
    "component": "DisplayImagePanel",
    "preStacked": true,
    "dependency": "imageMovement"
  },
  {
    "keyName": "info",
    "variant": "info",
    "title": "Image Details",
    "level": 2,
    "component": "ImageInfo",
    "preStacked": false,
    "dependency": "imageMovement",
    "properties": [ "currentImage" ]
  },
  {
    "keyName": "progress",
    "variant": "success",
    "title": "Artistic Process",
    "level": 3,
    "component": "ProgressView",
    "preStacked": true,
    "dependency": "refKey"
  },
  {
    "keyName": "geo",
    "variant": "warning",
    "title": "Location",
    "level": 3,
    "component": "GeoView",
    "preStacked": true,
    "dependency": "geoTag"
  },
  
]
