import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import Explan from '../AlbumInfo/';
import ThumbGallery from 'Containers/MainGallery';
import ProgressView from 'Containers/ProgressView';
import GeoView from 'Containers/GeoView';
import ImageInfo from 'Containers/ImageInfo';
import StackBoundary  from './StackBoundary';
// import StackLayer from './StackLayer';

import './stack.scss';
import withStacking from '../higherOrder/withStacking';



const Placeholder = props => (
  <div>This is a placeholder</div>
);

export const StackedPlaceholder = withStacking(Placeholder);

const MainGallery = withStacking(ThumbGallery);

export default props => {

  const {
    defaultKey, 
    hasMainGallery,
    hasAlbumInfo,
    aboutAlbum,
    hasImageInfo,
    hasProductInfo,
    hasGeoData,
    hasProgressGallery,
    hasRelatedGalleries,
    maxHeight,
    width,
  } = props;

  const style = {
    maxHeight: `${maxHeight}vh`, 
    width: `${width}vw`
  }

  return (
    <div className="stacker" style={style}>
      <StackBoundary>
        <Accordion defaultActiveKey={defaultKey}>

          {hasAlbumInfo && (
            <Explan  
              fullText={aboutAlbum} 
              eventKeyName="explan"
              variant="dark"
              cardTitle="About Album" 
              enabled={aboutAlbum && 1}
            />
          )}
          {hasMainGallery && (
            <MainGallery 
              eventKeyName="gallery" 
              variant="primary"
              cardTitle="Gallery"
            />
          )}
          {hasImageInfo && (
            <ImageInfo 
              eventKeyName="info"
              variant="secondary"
              cardTitle="About Image"
            />
          )}
          {hasProductInfo && (
            <StackedPlaceholder
              eventKeyName="product"
              variant="success"
              cardTitle="Products"
            />
          )}
          {hasProgressGallery && (
            <ProgressView
              eventKeyName="progress"
              variant="danger"
              cardTitle="Artistic Process"
            />
          )}
          {hasRelatedGalleries && (
            <StackedPlaceholder
              eventKeyName="related"
              variant="warning"
              cardTitle="Related Galleries"
            />
          )}
          {hasGeoData && (
            <GeoView
              eventKeyName="geo"
              variant="info"
              cardTitle="Location"
            />
          )}

        </Accordion>
      </StackBoundary>
    </div>
  )

};