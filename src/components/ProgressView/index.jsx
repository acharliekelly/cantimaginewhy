import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
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
    <Card className="progress-view" border={props.variant} text={props.variant} >
      <Accordion.Toggle as={Card.Header} eventKey={props.stackPosition}>
        <strong>Artistic Process</strong>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.stackPosition}>
        <Card.Body>
        <div className="view-wrapper">
          {progressImages[progressIndex] && (
            <div className="img-wrapper">
              <Image cloudName="cantimaginewhy" 
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
            <HelpButton 
              header="View Process" 
              content={helpText} 
              size="sm" 
              placement="top"
              variant={`outline-${props.variant}`} />
        </Card.Body>
      </Accordion.Collapse>
      
    </Card>
  )
}

ProgressView.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  refKey: PropTypes.string,
  thumbSize: PropTypes.number,
  stackPosition: PropTypes.number,
  variant: PropTypes.string
}

ProgressView.defaultProps = {
  selectLightbox: selectLightboxUtil,
  refKey: null,
  thumbSize: 80,
  variant: 'success'
}

export default ProgressView;
