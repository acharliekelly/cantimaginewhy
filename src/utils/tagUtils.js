import { fetchGallery, sortByField } from './imageApi';
import { albumExplanations } from '../config/text';
import { albums } from '../config/albums';
import { filters } from '../config/filters'; 


export const getAlbumByIndex = index => {
  return albums[index];
}

export const getAlbumSlice = lastIndex => {
  return albums.slice(0, lastIndex);
}

export const getFilterByIndex = (groupIndex, optionIndex) => {
  return filters[groupIndex][optionIndex];
}

// returns array of Tags
export const getFilterGroup = groupIndex => {
  return filters[groupIndex];
}

export const hasExplan = tagName => {
  return (albumExplanations[tagName] && albumExplanations[tagName].length > 0)
}

export const getExplanation = (tagObj, useDesc = false) => {
  if (hasExplan(tagObj.tag)) {
    return albumExplanations[tagObj.tag];
  } else {
    return useDesc ? tagObj.description : false;
  }
}

// return sorted image array from tag obj
export const createGalleryFromTag = tagObj => {
  return fetchGallery(tagObj.tag)
    .then(resources => sortByField(resources, tagObj.sortField));
}


export const findFilter = tag => {
  let fltr;
  filters.forEach(group => {
    fltr = group.options.find(option => option.tag === tag)
  })
  return fltr;
}

export const findAlbum = tag => {
  return albums.find(album => album.tag === tag)
}
