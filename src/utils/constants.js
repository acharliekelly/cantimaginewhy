
// BOOTSTRAP BREAKPOINTS
const BREAKPOINT_XS = 320;
const BREAKPOINT_SM = 576;
const BREAKPOINT_MD = 768;
const BREAKPOINT_LG = 992;
const BREAKPOINT_XL = 1200;


// TYPE CONSTANTS

/**
 * Item Display Style
 * applies to all list items
 * generally based on available space
 */
export const itemDisplayTypes = {
  noDisplay: 0,
  iconOnly: 1,
  textOnly: 2,
  iconAndText: 3,
  description: 4
};

/**
 * Bootstrap default breakpoints
 * for React Socks
 */
export const defaultBreakpoints = [
  { xs: BREAKPOINT_XS },
  { sm: BREAKPOINT_SM },
  { md: BREAKPOINT_MD },
  { lg: BREAKPOINT_LG },
  { xl: BREAKPOINT_XL }
];

/**
 * for React Sizes mapSizesToProps
 */
export const viewportSizes = {
  xs: BREAKPOINT_XS,
  sm: BREAKPOINT_SM,
  md: BREAKPOINT_MD,
  lg: BREAKPOINT_LG,
  xl: BREAKPOINT_XL
}

/**
 * for env-dependent behaviors
 */
export const environmentTypes = {
  'development': {
    icon: 'cog',
    favicon: 'ck.gif',
    text: 'Dev',
    className: 'development'
  },
  'test': {
    icon: 'check',
    favicon: 'ciw1.png',
    text: 'Test',
    className: 'test'
  },
  'production': {
    icon: 'heart',
    favicon: 'logo.png',
    text: 'Live',
    className: 'production'
  }
};


export const galleryTypes = {
  album: 1,
  filter: 2,
  category: 3
};