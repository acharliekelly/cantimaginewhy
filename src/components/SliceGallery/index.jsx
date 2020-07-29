import React from 'react';
import Container from 'react-bootstrap/Container';
import { Image } from 'cloudinary-react';
import { getContextProperty }from 'Api/cloudinaryApi';
// import { shuffleArray } from 'Utils/miscUtils';
// import { withLightbox } from '../higherOrder/withLightbox';

const SliceGallery = props => {
  const { imageHeight, imageList, showLightbox } = props;

  // useEffect(() => {
  //   fetchGallery(tagName).then(resources => {
  //     shuffleArray(resources);
  //     setImages(resources.slice(0, gallerySize))
  //   })
  // }, [tagName, gallerySize]);

  return (
    <Container fluid="lg">
      {imageList.map((image, index) => (
          <Image 
            key={index} 
            title={getContextProperty(image, 'caption', 'Untitled')}
            responsive 
            height={imageHeight}
            crop="fit" 
            cloudName="cantimaginewhy" 
            publicId={image.public_id}
            style={{ margin: '0.5em', cursor: 'pointer' }}
            onClick={showLightbox}
          />
      ))}
    </Container>
  );
}

export default SliceGallery;
