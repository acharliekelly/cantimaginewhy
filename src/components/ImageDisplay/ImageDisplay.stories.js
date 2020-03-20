import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageDisplay from './';



const mockList = [
  {
    "public_id": "art/first_parish",
    "version": 1573333648,
    "format": "jpg",
    "width": 3589,
    "height": 2876,
    "type": "upload",
    "created_at": "2019-11-09T21:07:28Z",
    "context": {
      "custom": {
        "alb-order": "42",
        "album": "Plein Air",
        "alt": "UU church in Waltham, MA",
        "caption": "First Parish",
        "key": "first_parish",
        "location": "Waltham, MA",
        "medium": "acrylic on panel",
        "original": "sold",
        "size": "10\" x 8\"",
        "year": "2019"
        }
      }
    },
    {
    "public_id": "art/cronins_landing",
    "version": 1573181788,
    "format": "jpg",
    "width": 2838,
    "height": 2893,
    "type": "upload",
    "created_at": "2019-11-08T02:56:28Z",
    "context": {
      "custom": {
        "alb-order": "41",
        "alt": "Moody Street",
        "caption": "Cronin's Landing",
        "key": "cronins_landing",
        "location": "Waltham, MA",
        "medium": "acrylic on panel",
        "original": "available",
        "price": "80",
        "size": "6\" x 6\"",
        "year": "2019"
        }
      }
    },
    {
      "public_id": "art/fall_footbridge",
      "version": 1572297634,
      "format": "jpg",
      "width": 3747,
      "height": 2828,
      "type": "upload",
      "created_at": "2019-10-28T21:20:34Z",
      "context": {
        "custom": {
        "alt": "View of footbridge from Watertown Dam, October",
        "caption": "Fall Footbridge",
        "key": "fall_footbridge",
        "location": "Watertown, MA",
        "medium": "acrylic on canvas",
        "original": "available",
        "price": "250",
        "size": "12\" x 9\"",
        "year": "2019"
        }
      }
    }
];


const stories = storiesOf('ImageDisplay', module);

stories
  .add('Static Display', () => (
    <ImageDisplay 
      currentImage={mockList[2]} 
      moveNext={() => console.log('next >>')} 
      movePrevious={() => console.log('<< prev')} 
    />
  ))
  .add('Dynamic List', () => {
    let imgIndex = 0;
    const mNext = () => { 
      imgIndex = (imgIndex + 1) % mockList.length
    }
    const mPrev = () => { 
      imgIndex = (imgIndex + mockList.length - 1) % mockList.length 
    }

    return (
      <ImageDisplay
        currentImage={mockList[imgIndex]} 
        moveNext={mNext} 
        movePrevious={mPrev} 
        imageList={mockList}
      />
    )
})
