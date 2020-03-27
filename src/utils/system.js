// System Utilities

const envIcons = {
  'development': 'cog',
  'test': 'check',
  'production': 'heart'
}

const favicons = {
  'development': 'ciw4.png',
  'test': 'ciw1.png',
  'production': 'ck.gif'
};

const getFavicon = () => {
  return favicons[process.env.NODE_ENV];
}

const faviconUrl = () => {
  return process.env.PUBLIC_URL + '/' + getFavicon();
}

export const updateFavicon = () => {
  const faviconElem = document.getElementById('favicon');
  faviconElem.href = faviconUrl();
}

export const allowDevMode = () => {
  return (process.env.NODE_ENV === 'development');
}


export const getEnvIcon = () => {
  return envIcons[process.env.NODE_ENV];
}


export const getEnvName = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'dev';
    case 'production':
      return 'live';
    default:
      return process.env.NODE_ENV;
  }
}

export const getEnvClass = () => {
  return process.env.NODE_ENV;
}

