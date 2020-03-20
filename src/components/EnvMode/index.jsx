import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { allowDevMode, getEnvName, getEnvClass, getEnvIcon } from '../../utils/system';

import './mode.scss';


const textMode = (cls, devFn) => (
  <span className={cls} onClick={devFn}>{getEnvName()}</span>
)

const iconMode = (cls, devFn) => (
  <FontAwesomeIcon className={cls} icon={getEnvIcon()} onClick={devFn} />
)

const EnvMode = props => {
  const { type, devMode } = props;

  const active = allowDevMode() ? ' enabled' : '';
  const modeCls = getEnvClass();
  return (
    <div className={`current-mode ${active} ${type}`}>
      {type === 'icon' ? iconMode(modeCls, devMode) : textMode(modeCls, devMode)}
    </div>
  )
}

export default EnvMode;
