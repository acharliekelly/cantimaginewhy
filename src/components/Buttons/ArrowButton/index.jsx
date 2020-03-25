import React from 'react';
import PropTypes from 'prop-types';

import './arrows.scss';


export const ArrowButton = props => {
  const { direction, size, color } = props;
  const styles = getBorders(direction, size, color);
  
  return (
    <div className={`arrow-btn arrow-${direction}`} style={styles}></div>
  )
}

const getBorders = (direction, size, color) => {
  let borderStyles;
  switch (direction) {
    case 'up':
      borderStyles = sideBorders(size);
      borderStyles.borderBottom = `${color} solid ${size}`;
      break;
    case 'down':
      borderStyles = sideBorders(size);
      borderStyles.borderTop = `${color} solid ${size}`;
      break;
    case 'left':
      borderStyles = vertBorders(size);
      borderStyles.borderRight = `${color} solid ${size}`;
      break;
    case 'right':
      borderStyles = vertBorders(size);
      borderStyles.borderLeft = `${color} solid ${size}`;
      break;
    default:
      borderStyles = sideBorders('5em');
  }
  return borderStyles;
}

const sideBorders = size => {
  return {
    borderLeft: `solid transparent ${size}`,
    borderRight: `solid transparent ${size}`
  }
}

const vertBorders = size => {
  return {
    borderTop: `solid transparent ${size}`,
    borderBottom: `solid transparent ${size}`
  }
}

ArrowButton.propTypes = {
  direction: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string
};

ArrowButton.defaultProps = {
  size: '5em',
  color: '#000'
};
