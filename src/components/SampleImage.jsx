import React from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';

const SampleImage = () => (
  <CloudinaryContext cloudName="cantimaginewhy">
    <div className="image">
      <Image publicId="art/ga2yqxl3edqufvdxfqnj" width="800"/>
      <div className="title">test</div>
    </div>
  </CloudinaryContext>
);

export default SampleImage;
