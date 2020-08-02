import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import ProgressGallery from '../../containers/ProgressGallery';
import ImageToolbar from '../ImageToolbar';
import { withLightbox } from '../higherOrder/withLightbox';
import { withStacking } from '../higherOrder/withStacking';
import './progress.scss';

const ProgressView = props => {
  const { progressImages, progressIndex, nextImage, prevImage, openLightbox } = props;

  // useEffect(() => {
  //   onsitePhotos(referenceKey).then(resources => setProgressImages(resources));
  // }, [referenceKey]);

  const moveNext = () => nextImage(progressImages, progressIndex);

  const movePrev = () => prevImage(progressImages, progressIndex);

  // const magnifyImage = () => {
  //   const { selectLightbox } = props;
  //   const imgId = progressImages[progressIndex].public_id;
  //   selectLightbox(imgId, progressImages);
  // }

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
          onClick={openLightbox} >
            <Transformation height="200" width="auto" crop="fill" />
        </Image>
        <ImageToolbar 
          variant={props.variant}
          prevImageFn={movePrev}
          nextImageFn={moveNext}
          zoomImageFn={openLightbox}
          disableCarousel={progressImages.length < 2}
        />
      </div>

      {progressImages.length > 1 && (
        <ProgressGallery />
      )}
    </div>
    )}
    </>
  )
}

export default withLightbox(withStacking(ProgressView));
