import React from 'react';

import './mode.scss';

const getEnvName = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'dev';
    case 'production':
      return 'live';
    default:
      return process.env.NODE_ENV;
  }
}



export default function EnvMode() {
  const mode = getEnvName();
  return (
    <div className="current-mode">
      <span className={process.env.NODE_ENV}>{mode}</span>
    </div>
  )
}
