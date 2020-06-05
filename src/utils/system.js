// System Utilities
import withSizes from 'react-sizes';
import { setDefaultBreakpoints } from 'react-socks';


/**
 * Bootstrap default breakpoints
 * for React Socks
 */
const BOOTSTRAP_DEFAULT_BREAKPOINTS = [
  { xs: 320 },
  { sm: 576 },
  { md: 768 },
  { lg: 992 },
  { xl: 1200 }
];



export const initSocks = () => {
  setDefaultBreakpoints(BOOTSTRAP_DEFAULT_BREAKPOINTS)
}



const environments = {
  'development': {
    icon: 'cog',
    favicon: 'ck.gif',
    text: 'dev',
    className: 'development'
  },
  'test': {
    icon: 'check',
    favicon: 'ciw1.png',
    text: 'test',
    className: 'test'
  },
  'production': {
    icon: 'heart',
    favicon: 'logo.png',
    text: 'live',
    className: 'production'
  }
}

export const getEnv = () => environments[process.env.NODE_ENV];


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


// withSizes
/**
 * for applying sizes HoC
 * @param {object} sizes 
 */
export const mapSizesToProps = sizes => ({
  isMobile: withSizes.isMobile(sizes),
  isTablet: withSizes.isTablet(sizes),
  isDesktop: withSizes.isDesktop(sizes),
  isCondensed: sizes.width < 600
})


