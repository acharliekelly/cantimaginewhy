import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectLightboxUtil, moveNextUtil, movePreviousUtil } from '../../utils/imageUtils';

const ImageToolbar = props => {
  const { fullWidth, variant, prevImageFn, nextImageFn, zoomImageFn, imgSize, disableCarousel } = props;
  const grpCls = fullWidth ? 'max' : '';

  const keyDown = event => {
    switch (event.keyCode) {
      case 37:
      // left arrow
        prevImageFn();
      break;
      case 39:
      // right arrow
        nextImageFn();
      break;
      case 13:
      // enter
        zoomImageFn();
      break;
      default:
        // do nothing
    }
  }

  return (
    <Container className="toolbar">
      <ButtonGroup className={grpCls} onKeyDown={keyDown} >
        <Button variant={variant} title="Previous Image" onClick={prevImageFn} disabled={disableCarousel}>
          <FontAwesomeIcon icon="chevron-left" size={imgSize} />
        </Button>
        <Button variant={variant} title="Zoom" onClick={zoomImageFn} block>
          <FontAwesomeIcon icon="search-plus" size={imgSize} />
        </Button>
        <Button variant={variant} title="Next Image" onClick={nextImageFn} disabled={disableCarousel}>
          <FontAwesomeIcon icon="chevron-right" size={imgSize} />
        </Button>
      </ButtonGroup>
    </Container>
  )
}


ImageToolbar.propTypes = {
  /**
   * bootstrap variant
   */
  variant: PropTypes.string,
  /**
   * use full width
   */
  fullWidth: PropTypes.bool,
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
  zoomImageFn: PropTypes.func.isRequired,
  /**
   * disable carousel buttons (prev & next)
   */
  disableCarousel: PropTypes.bool,
}

ImageToolbar.defaultProps = {
  variant: 'dark',
  fullWidth: true,
  imgSize: '2x',
  toolbarClass: 'toolbar',
  prevImageFn: movePreviousUtil,
  nextImageFn: moveNextUtil,
  zoomImageFn: selectLightboxUtil,
  disableCarousel: false,
}

export default ImageToolbar;
