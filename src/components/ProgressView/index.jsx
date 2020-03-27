import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { onsitePhotos } from '../../utils/onsiteUtils';
import HelpButton from '../Buttons/HelpButton';
import ThumbGallery from '../ThumbGallery';
import ImageToolbar from '../ImageToolbar';
import { selectLightboxUtil } from '../../utils/imageUtils';
import './progress.scss';

const helpText = `Series of photos documenting the creative process, from initial view to finished product.`

const ProgressView = props => {
  const { refKey, thumbSize } = props;
  const [ progressImages, setProgressImages ] = useState([]);
  const [ progressIndex, setProgressIndex ] = useState(0);

  const clearProgressGallery = () => {
    setProgressImages([]);
    setProgressIndex(0);
  }

  useEffect(() => {
    onsitePhotos(refKey).then(resources => setProgressImages(resources));
    return clearProgressGallery;
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
    selectLightbox('', progressImages, progressIndex);
  }

  return (
    <div className="progress-view">
      <HelpButton header="View Process" content={helpText} size="sm" imageOnly />
      <header>
        
        <h2 className="comp-title">Artistic Process</h2>
        
      </header>

      <div className="view-wrapper">
      {progressImages[progressIndex] && (
        <div className="img-wrapper">
        
          <Image cloudName="cantimaginewhy" 
            publicId={progressImages[progressIndex].public_id} 
          />
          <ImageToolbar 
            variant="success"
            prevImageFn={movePrev}
            nextImageFn={moveNext}
            zoomImageFn={magnifyImage}
            disableCarousel={progressImages.length < 2}
          />
        </div>

        )}
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
  )
}

ProgressView.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  refKey: PropTypes.string,
  thumbSize: PropTypes.number
}

ProgressView.defaultProps = {
  selectLightbox: selectLightboxUtil,
  refKey: null,
  thumbSize: 80
}

export default ProgressView;
