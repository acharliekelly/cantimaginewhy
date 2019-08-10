import React from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';

const SampleImage = () => (
  <CloudinaryContext cloudName="cantimaginewhy">
    <div className="image">
      <Image publicId="sample" width="800"/>
      <div className="title">Sample</div>
    </div>
  </CloudinaryContext>
);

export default SampleImage;
