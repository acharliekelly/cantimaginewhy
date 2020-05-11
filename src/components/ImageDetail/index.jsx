import React from 'react';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ImageToolbar, { TouchToolbar } from '../ImageToolbar/index';
import { withLightbox } from '../higherOrder/withLightbox';
import DisplayImage, { DisplayImageZoom } from '../DisplayImage';
import ImageInfo from '../ImageInfo';
// import classNames from 'classnames';
import { Breakpoint } from 'react-socks';

import './detail.scss';

const ImageDetail = props => {
  const { imgGallery } = props;
 

  if (imgGallery.currentImage) {
    return (
      <>
      <Breakpoint md down>
        <Container className="image-detail full-width">
          <DisplayImageZoom {...props} />
          <TouchToolbar {...props} />
          <ImageInfo currentImage={imgGallery.currentImage} />
        </Container>
      </Breakpoint>
      <Breakpoint lg up>
        <Container className="image-detail">
          <DisplayImage {...props} />
          <ImageToolbar variant="light" imgSize="2x" {...props} />
          <ImageInfo currentImage={imgGallery.currentImage} />
        </Container>
      </Breakpoint>
      </>
    )
  } else {
    return (
      <div className="no-data"></div>
    )
  }
}

export default withLightbox(ImageDetail);
