import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ImageToolbar from '../ImageToolbar/';
import { withLightbox } from '../higherOrder/withLightbox';
import DisplayImage from '../DisplayImage';
import ImageInfo from '../ImageInfo';
import classNames from 'classnames';

import './detail.scss';

const ImageDetail = props => {
  const { imageList, imageIndex, isFullWidth, imageMovement, loadingLabel, tagObject } = props;
  const currentImage = imageList?.[imageIndex];

  if (!currentImage && !loadingLabel) return null;

  const magnifyImage = () => {
    props.selectLightbox(currentImage.public_id, imageList);
  };
  const zoom = currentImage && !isFullWidth ? magnifyImage : undefined;
  const cls = classNames('image-detail', { 'full-width': isFullWidth });

  return (
    <Container className={cls}>
      <DisplayImage {...props} currentImage={currentImage} imageZoom={zoom} />

      {loadingLabel ? (
        <p role="status" className="image-detail-loading">{loadingLabel}</p>
      ) : (
        <>
          <ImageToolbar
            variant="light"
            imgSize="2x"
            fullWidth
            prevImageFn={imageMovement?.movePrevious}
            nextImageFn={imageMovement?.moveNext}
            zoomImageFn={zoom}
            disableCarousel={imageList.length < 2}
            tagObject={tagObject}
          />
          <ImageInfo currentImage={currentImage} />
        </>
      )}
    </Container>
  );
};

ImageDetail.propTypes = {
  loadingLabel: PropTypes.string,
  /**
   * results of fetchGallery
   */
  imageList: PropTypes.array,
  /**
   * the starting index
   */
  imageIndex: PropTypes.number,
  /**
   * the function to move back
   */
  movePrevious: PropTypes.func,
  /**
   * the function to move forward
   */
  moveNext: PropTypes.func,
  imageMovement: PropTypes.object,
  /**
   * the function to open image in Zoom
   */
  selectLightbox: PropTypes.func,
  /**
   * current gallery
   */
  tagObject: PropTypes.object
}

ImageDetail.defaultProps = {
  imageIndex: 0,
}

export default withLightbox(ImageDetail);
