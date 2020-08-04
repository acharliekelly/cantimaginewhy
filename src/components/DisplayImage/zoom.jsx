import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Image, Transformation } from 'cloudinary-react';
import classNames from 'classnames';
import { imageZoomSizes } from 'Utils/imageUtils';



// for mobile - self-defined zoom function
export const DisplayImageZoom = props => {
  const { currentImage, enabled } = props;
  const zoomSizes = imageZoomSizes(currentImage, [300,200]);
  
  const [ zoomFactor, setZoomFactor ] = useState(1);

  const incrementZoom = () => {
    const nextZf = (zoomFactor + 1) % zoomSizes.length;
    setZoomFactor(nextZf);
  }

  const viewCls = classNames('image-view', 'full-width', { 'enabled': enabled });
  return (
    <Container className={viewCls}>
      {currentImage && currentImage.public_id ? (
        <Image cloudName="cantimaginewhy"
          publicId={currentImage.public_id}
          onClick={incrementZoom}>
            <Transformation width={zoomSizes[zoomFactor][0]} height={zoomSizes[zoomFactor][1]} />
        </Image>
      ) : (
        <div className="placeholder"  />
      )}
    </Container>
  )
}
