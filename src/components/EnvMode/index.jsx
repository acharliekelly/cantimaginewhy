import React from 'react';

import { allowDevMode, getEnvName, getEnvClass } from '../../utils/system';

import './mode.scss';


const EnvMode = props => {
  const mode = getEnvName();
  const active = allowDevMode() ? ' enabled' : '';
  const modeCls = getEnvClass();
  return (
    <div className={'current-mode' + active}>
      <span className={modeCls} onClick={props.devMode}>{mode}</span>
    </div>
  )
}

export default EnvMode;
