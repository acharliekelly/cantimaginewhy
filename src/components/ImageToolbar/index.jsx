import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/system';

const ImageToolbar = props => {
  const { variant, prevImageFn, nextImageFn, zoomImageFn, zoomText, imgSize, disableCarousel } = props;
  const grpCls = props.fullWidth ? 'max' : '';

  const mStyle = {
    fontSize: props.isMobile ? '0.5rem' : '1rem'
  }

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
    <Container className="toolbar" style={mStyle}>
      <ButtonGroup className={grpCls} onKeyDown={keyDown} >
        <Button variant={variant} title="Previous Image" onClick={prevImageFn} disabled={disableCarousel}>
          <FontAwesomeIcon icon="chevron-left" size={imgSize} />
        </Button>
        {props.zoomImageFn ? (
          <Button variant={variant} title="Zoom" onClick={zoomImageFn} block>
            <FontAwesomeIcon icon="search-plus" size={imgSize} />
            {zoomText && (
              <span style={{marginLeft: '1em', fontSize: '2em', fontWeight: 'bold'}}>{zoomText}</span>
            )}
          </Button>
        ) : (
          <Button variant={variant} block disabled />
        )}
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
  zoomImageFn: PropTypes.func,
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
  disableCarousel: false,
}

export default withSizes(mapSizesToProps)(ImageToolbar);
