/**
 * Menu Item:
 * - name: {string} Display Name
 * - location: {string} relative path
 * - icon: {string} FA image
 * - external: {boolean} external site
 */

export const pages = [
  {
    name: "Home",
    location: "/",
    icon: "home"
  },
  {
    name: "Artwork",
    location: "artwork",
    icon: "paint-brush"
  },
  {
    name: "About",
    location: "about",
    icon: "id-card"
  },
  {
    name: "Connect",
    location: "connect",
    icon: "user-circle"
  },
  {
    name: "Shop",
    location: "https://charlie-kelly.pixels.com",
    icon: "shopping-cart",
    external: true
  }
];

/**
 * subnav for About & Connect
 */
export const sections = [
  {
    name: "Art",
    location: "art",
    icon: "palette"
  },
  {
    name: "Design",
    location: "design",
    icon: "drafting-compass"
  },
  {
    name: "Tech",
    location: "tech",
    icon: "code"
  }
];

/**
 * Artwork sorting options
 */
export const artViews = [
  {
    name: "Albums",
    location: "albums",
    icon: "images"
  },
  {
    name: "Categories",
    location: "category",
    icon: "sitemap"
  },
  {
    name: "Filter",
    location: "filters",
    icon: "filter"
  }
];

export const artSorting = [
  {
    name: "Date",
    location: "completed",
    icon: "clock"
  },
  {
    name: "Title",
    location: "title",
    icon: "font"
  },
  {
    name: "Filename",
    location: "filename",
    icon: "file-alt"
  },
  {
    name: "Order",
    location: "alb-order",
    icon: "list-ol"
  },
  {
    name: "Price",
    location: "price",
    icon: "tag"
  },
  {
    name: "Location",
    location: "location",
    icon: "map-marked-alt"
  }
];

/**
 * featured artwork galleries 
 */
export const homeViews = [
  {
    name: "Favorites",
    location: "favorite",
    icon: "star"
  },
  {
    name: "Recent",
    location: "recent",
    icon: "history"
  },
  {
    name: "Random",
    location: "~",
    icon: "dove"
  }
];