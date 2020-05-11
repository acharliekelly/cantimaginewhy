import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/system';

// mobile toolbar - zoom via fetch, move via click or swipe
export const TouchToolbar = props => {
  const { variant, imgGallery, zoomImageFn, imgSize, disableCarousel } = props;

  return (
    <Container className="toolbar" style={{fontSize: '0.5rem'}}>
      <ButtonGroup className="max" >
        <Button variant={variant} title="Previous Image" onClick={imgGallery.movePrevious} disabled={disableCarousel}>
          <FontAwesomeIcon icon="chevron-left" size={imgSize} />
        </Button>
        {props.zoomImageFn ? (
          <Button variant={variant} title="Zoom" onClick={zoomImageFn} block>
            <FontAwesomeIcon icon="search-plus" size={imgSize} />
          </Button>
        ) : (
          <Button variant={variant} block disabled />
        )}
        <Button variant={variant} title="Next Image" onClick={imgGallery.moveNext} disabled={disableCarousel}>
          <FontAwesomeIcon icon="chevron-right" size={imgSize} />
        </Button>
      </ButtonGroup>
    </Container>
  )
  
}

// default toolbar - zoom via lightbox, move via click or keydown
const ImageToolbar = props => {
  const { variant, imgGallery, zoomImageFn, imgSize, disableCarousel } = props;

  const grpCls = props.fullWidth ? 'max' : '';

  const mStyle = {
    fontSize: props.isMobile ? '0.5rem' : '1rem'
  }

  const keyDown = event => {
    switch (event.keyCode) {
      case 37:
      // left arrow
        imgGallery.movePrevious();
      break;
      case 39:
      // right arrow
        imgGallery.moveNext();
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
        <Button variant={variant} title="Previous Image" onClick={imgGallery.movePrevious} disabled={disableCarousel}>
          <FontAwesomeIcon icon="chevron-left" size={imgSize} />
        </Button>
        {props.zoomImageFn ? (
          <Button variant={variant} title="Zoom" onClick={zoomImageFn} block>
            <FontAwesomeIcon icon="search-plus" size={imgSize} />
          </Button>
        ) : (
          <Button variant={variant} block disabled />
        )}
        <Button variant={variant} title="Next Image" onClick={imgGallery.moveNext} disabled={disableCarousel}>
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
