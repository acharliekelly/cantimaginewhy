import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// prop: [ 0, 1 ]
const toggleProps = {
  icon: ['sort-down', 'sort-up'],
  variant: ['light', 'dark']
}


const ToggleButton = props => {
  const { toggleAction, iconSize } = props;
  const [ toggle, setToggle ] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
    toggleAction(toggle);
  }

  const tProp = key => toggleProps[key][toggle ? 0 : 1]

  return (
    <Button variant={tProp('variant')} onClick={onToggle}>
      <FontAwesomeIcon icon={tProp('icon')} size={iconSize} />
    </Button>
  )
}

ToggleButton.propTypes = {
  toggleAction: PropTypes.func,
  initialState: PropTypes.bool,
  iconSize: PropTypes.string
}

ToggleButton.defaultProps = {
  initialState: false,
  iconSize: 'lg'
}

export default ToggleButton;
