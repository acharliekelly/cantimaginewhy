import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { onsitePhotos } from '../../utils/onsiteUtils';
import ThumbGallery from '../ThumbGallery';
import ImageToolbar from '../ImageToolbar';
import { withLightbox } from '../higherOrder/withLightbox';
import { withStacking } from '../higherOrder/withStacking';
import './progress.scss';


const ProgressView = props => {
  const { refKey, thumbSize } = props;
  const [ progressImages, setProgressImages ] = useState([]);
  const [ progressIndex, setProgressIndex ] = useState(0);

  useEffect(() => {
    onsitePhotos(refKey).then(resources => setProgressImages(resources));
  }, [refKey]);

  const moveNext = () => {
    const next = (progressIndex + 1) % progressImages.length;
    setProgressIndex(next)
  }

  const movePrev = () => {
    const prev = (progressIndex + progressImages.length - 1) % progressImages.length;
    setProgressIndex(prev)
  }

  const magnifyImage = () => {
    const { selectLightbox } = props;
    const imgId = progressImages[progressIndex].public_id;
    selectLightbox(imgId, progressImages);
  }

  return (
    <>
    {progressImages[progressIndex] && (
    <div className="view-wrapper">
      <div className="help-text">
      Series of photos documenting the creative process, from initial view to finished product.
      </div>
      <div className="img-wrapper">
        <Image  
          publicId={progressImages[progressIndex].public_id} 
          onClick={magnifyImage} >
            <Transformation height="200" width="auto" crop="fill" />
        </Image>
        <ImageToolbar 
          variant={props.variant}
          prevImageFn={movePrev}
          nextImageFn={moveNext}
          zoomImageFn={magnifyImage}
          disableCarousel={progressImages.length < 2}
        />
      </div>

      {progressImages.length > 1 && (
        <ThumbGallery 
          className="process-images"
          selectThumbnail={setProgressIndex} 
          galleryImages={progressImages} 
          imageIndex={progressIndex}
          thumbSize={thumbSize}
          />
      )}
    </div>
    )}
    </>
  )
}

ProgressView.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  refKey: PropTypes.string,
  thumbSize: PropTypes.number,
}

ProgressView.defaultProps = {
  refKey: null,
  thumbSize: 80,
  variant: 'info'
}

export default withLightbox(withStacking(ProgressView));
