import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectLightboxUtil, moveNextUtil, movePreviousUtil } from '../../utils/imageUtils';

const ImageToolbar = props => {
  const { toolbarClass, variant, prevImageFn, nextImageFn, zoomImageFn, imgSize } = props;
  return (
    <Container className="toolbar">
      <ButtonGroup className={toolbarClass}>
        <Button variant={variant} title="Previous Image" onClick={prevImageFn}>
          <FontAwesomeIcon icon="chevron-left" size={imgSize} />
        </Button>
        <Button variant={variant} title="Zoom" onClick={zoomImageFn}>
          <FontAwesomeIcon icon="search-plus" size={imgSize} />
        </Button>
        <Button variant={variant} title="Next Image" onClick={nextImageFn}>
          <FontAwesomeIcon icon="chevron-right" size={imgSize} />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

ImageToolbar.propTypes = {
  /**
   * className for ButtonGroup
   */
  toolbarClass: PropTypes.string,
  /**
   * bootstrap variant
   */
  variant: PropTypes.string,
  /**
   * size of icons
   */
  imgSize: PropTypes.string,
  /**
   * function for Previous Image
   */
  prevImageFn: PropTypes.func.isRequired,
  /**
   * function for Next Image
   */
  nextImageFn: PropTypes.func.isRequired,
  /**
   * function for Zoom
   */
  zoomImageFn: PropTypes.func.isRequired
}

ImageToolbar.defaultProps = {
  variant: 'dark',
  imgSize: '2x',
  toolbarClass: 'toolbar',
  prevImageFn: movePreviousUtil,
  nextImageFn: moveNextUtil,
  zoomImageFn: selectLightboxUtil
}

export default ImageToolbar;
