import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { allowDevMode, getEnvName, getEnvClass, getEnvIcon } from '../../utils/system';

import './mode.scss';


const textMode = (cls, devFn) => (
  <span className={cls}>{getEnvName()}</span>
)

const iconMode = (cls, devFn) => (
  <FontAwesomeIcon className={cls} icon={getEnvIcon()} title={getEnvName()} />
)

const EnvMode = props => {
  const { type } = props;

  const active = allowDevMode() ? ' enabled' : '';
  const modeCls = getEnvClass();
  return (
    <div className={`current-mode ${active} ${type}`}>
      {type === 'icon' ? iconMode(modeCls) : textMode(modeCls)}
    </div>
    
  )
}

export default EnvMode;
