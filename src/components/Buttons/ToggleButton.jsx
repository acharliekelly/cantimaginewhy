import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// prop: [ 0, 1 ]
const toggleProps = {
  icon: ['chevron-square-down', 'chevron-square-up'],
  variant: ['light', 'dark']
}

/**
 * Stateless toggle switch:
 *  collapse (0) or expand (1)
 */
const ToggleButton = props => {
  const { toggleAction, iconSize, toggleState, ...styleProps } = props;

  const tProp = key => toggleProps[key][toggleState ? 0 : 1]

  return (
    <Button variant={tProp('variant')} onClick={toggleAction} {...styleProps}>
      <FontAwesomeIcon icon={tProp('icon')} size={iconSize} />
    </Button>
  )
}

ToggleButton.propTypes = {
  toggleAction: PropTypes.func,
  iconSize: PropTypes.string
}

ToggleButton.defaultProps = {
  toggleState: false,
  iconSize: 'lg'
}

export default ToggleButton;
