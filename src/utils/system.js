// System Utilities


export const formsTarget = 'https://formsubmit.co/cant.imagine.why00@gmail.com';

export const allowDevMode = () => {
  return (process.env.NODE_ENV === 'development');
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


/**
 * used in Netlify forms
 * @param {*} data 
 */
export const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}
