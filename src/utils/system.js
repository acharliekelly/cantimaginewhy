// System Utilities
// import withSizes from 'react-sizes';
import { setDefaultBreakpoints } from 'react-socks';
import { 
  defaultBreakpoints, 
  environmentTypes, 
  viewportSizes } from './constants';





export const initSocks = () => {
  setDefaultBreakpoints(defaultBreakpoints)
}



export const getEnv = () => environmentTypes[process.env.NODE_ENV];


const faviconUrl = () => {
  return process.env.PUBLIC_URL + '/' + getEnv().favicon
}

export const updateFavicon = () => {
  const faviconElem = document.getElementById('favicon');
  faviconElem.href = faviconUrl();
}



// GETTING HOST NAME
// should probably go someplace else
export const extractHostName = url=> {
  let hostName;
  // find and remove protocol
  if (url.indexOf('//') > -1) {
    hostName = url.split('/')[2];
  } else {
    hostName = url.split('/')[0];
  }

  // remove port number
  hostName = hostName.split(':')[0];

  // remove '?'
  hostName = hostName.split('?')[0];

  return hostName;
}

// just the domain name
export const extractDomainName = url => {

  let domainName = extractHostName(url);
  
  if (domainName.split('.').length > 2) {
    domainName = domainName.split('.').slice(-2).join('.');
  } 

  return domainName;
}


/**
 * for applying sizes HoC
 * uses Bootstrap defaults
 * @param {object} sizes 
 */
export const mapSizesToProps = sizes => ({
  isTiny: sizes.width <= viewportSizes.xs, // 0 - 320
  isSmall: sizes.width > viewportSizes.xs && sizes.width <= viewportSizes.sm, // 320 - 576
  isMedium: sizes.width > viewportSizes.sm && sizes.width <= viewportSizes.md, // 576 - 768
  isLarge: sizes.width > viewportSizes.md && sizes.width <= viewportSizes.lg, // 768 - 992
  isHuge: sizes.width > viewportSizes.lg && sizes.width <= viewportSizes.xl, // 992 - 1200
  isMassive: sizes.width > viewportSizes.xl, // > 1200
  isMobile: sizes.width <= viewportSizes.sm,
  isTablet: sizes.width > viewportSizes.sm && sizes.width < viewportSizes.lg,
  isDesktop: sizes.width >= viewportSizes.lg,
  isCondensed: sizes.width < 600
})


