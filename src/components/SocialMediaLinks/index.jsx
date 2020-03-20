import React from 'react';
import { Image } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cloudName } from '../../utils/imageApi';

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
    <a key={link.name} target="_blank" rel="noopener noreferrer" href={link.url}>
      {img}
    </a>
  )
};

const cloudImg = link => (
  <Image cloudName={cloudName} publicId={`icon/${link.name}_logo`} height="100" />
);

const faImg = link => (
  <FontAwesomeIcon icon={['fab', link.name]} size="2x" />
);


// if FontAwesome isn't working
export const cloudinaryLinks = () => {
  return (
    <div className="social" >
      {links.map(link => smLink(link, true))}
    </div>
  )
}


export default function SocialMediaLinks () {
  return (
    <div className="social">
      {links.map(link => smLink(link))}
    </div>
  )
}
