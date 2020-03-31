import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import  { faaUrl } from '../../../utils/imageUtils';

// Assumes product page exists for this image
const ProductButton = props => {
  const { productKey, variant, size, buttonText } = props;
  return (
    <Button
      size={size}
      className="product-btn" 
      title="Buy stuff with this on it"
      as="a" 
      variant={variant}
      rel="noopener noreferrer"
      target="_blank" 
      href={faaUrl(productKey)}
      >
        {buttonText && `${buttonText} `}
        <FontAwesomeIcon icon="shopping-cart" size={size} />
    </Button>
  )
}

ProductButton.propTypes = {
  productKey: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  buttonText: PropTypes.string
}

ProductButton.defaultProps = {
  variant: 'success',
  size: 'lg',
}

export default ProductButton;
