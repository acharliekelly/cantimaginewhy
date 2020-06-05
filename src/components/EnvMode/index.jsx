import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEnv } from '../../utils/system';
import './mode.scss';


const EnvMode = () => {
  const mode = getEnv();

  return (
    <div className="current-mode icon">
      <FontAwesomeIcon className={mode.className} icon={mode.icon} title={mode.text} />
    </div>
  )
}

export default EnvMode;
