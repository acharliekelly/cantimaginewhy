import { sortByField } from 'Utils/imageUtils';
import { fetchGallery } from 'Api/cloudinaryApi';
import { albumExplanations } from 'LocalData/text';
import { albums } from 'LocalData/albums';
import { filters } from 'LocalData/filters'; 


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

// same, but tag string only (return unsorted)
export const createGalleryFromTagName = (tagName, sortField = '') => {
  if (sortField) {
    return fetchGallery(tagName).then(resources => sortByField(resources, sortField));
  } else {
    return fetchGallery(tagName);
  }
}

/**
 * return Tagob from tag
 */
export const findFilter = tagName => {
  let fltr;
  filters.forEach((group, gpIndex) => {
    const fIdx = group.options.findIndex(option => option.tag === tagName);
    if (fIdx >= 0) {
      fltr = group.options[fIdx];
      if (fltr) {
        // add props to tag
        fltr.source = 'filters';
        fltr.group = group.name;
        fltr.groupIndex = gpIndex;
        fltr.index = fIdx;
        console.log('found filter: ', fltr)
        return fltr;
      }
    }
  })
  return fltr || null;
}

/**
 * return Tagob from tag
 */
export const findAlbum = tagName => {
  const idx = albums.findIndex(album => album.tag === tagName);
  const alb = albums[idx];
  if (alb) {
    // add props
    alb.source = 'albums';
    alb.index = idx;
    return alb;
  }
  return null;
}
