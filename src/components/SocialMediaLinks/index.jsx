import React from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EnvMode from '../EnvMode';

import './social.scss';


const links = [
  {
    name: 'instagram',
    url: 'https://instagram.com/cant_imagine_why'
  },
  {
    name: 'facebook',
    url: 'https://facebook.com/acharliekelly'
  },
  {
    name: 'github',
    url: 'https://githum.com/acharliekelly'
  }
];

const smLink = (link, cloud = false) => {
  const img = cloud ? cloudImg(link) : faImg(link);
  return (
    <a target="_blank" rel="noopener noreferrer" href={link.url}>
      {img}
    </a>
  )
};

const cloudImg = link => (
  <Image publicId={`icon/${link.name}_logo`} height="100" />
);

const faImg = link => (
  <FontAwesomeIcon icon={['fab', link.name]} size="2x" />
);


// if FontAwesome isn't working
export const cloudinaryLinks = () => {
  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <div className="right-col social">
        {links.map(link => smLink(link, true))}
      </div>
      <EnvMode />
    </CloudinaryContext>
  )
}


export default function SocialMediaLinks() {
  return (
    <div className="right-col social">
      <div className="links">
        {links.map(link => smLink(link))}
      </div>
      <EnvMode />
    </div>
  )
}
