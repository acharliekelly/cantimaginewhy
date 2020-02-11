import React from 'react';
import { Image, CloudinaryContext } from '../FilteredGaller/components/cloudinary-react';
import { FontAwesomeIcon } from '../FilteredGaller/components/@fortawesome/react-fontawesome';

import './social.scss';

// if FontAwesome isn't working
export const cloudinaryLinks = () => {
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


export default function SocialMediaLinks() {
  return (
    <div className="right-col social">
      <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/cant_imagine_why">
        <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/acharliekelly">
        <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/acharliekelly">
        <FontAwesomeIcon icon={['fab', 'github']} size="2x" />
      </a>
    </div>
  )
}


