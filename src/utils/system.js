// System Utilities



export const allowDevMode = () => {
  return (process.env.NODE_ENV === 'development');
}

const envIcons = {
  'development': 'cog',
  'test': 'check',
  'production': 'heart'
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

