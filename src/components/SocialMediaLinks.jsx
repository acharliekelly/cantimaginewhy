import React from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';

const SocialMediaLinks = () => {
  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <div className="social">
        <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/cant_imagine_why">
          <Image publicId="icon/instagram_logo" height="100" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/acharliekelly">
          <Image publicId="icon/facebook_logo" height="100" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/acharliekelly">
          <Image publicId="icon/github_logo" height="100" />
        </a>
      </div>
    </CloudinaryContext>
  )
}

export default SocialMediaLinks;
