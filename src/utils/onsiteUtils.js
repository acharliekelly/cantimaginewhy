import { fetchGallery } from './imageApi';
import { flattenResources, cpidSort } from './processUtils';


class OnsiteLibrary {
  constructor (autoload) {
    this.resources = [];
    if (autoload) {
      this.init();
    }
  }

  init = () => {
    fetchGallery('onsite')
      .then(res => {
        this.resources.push(res.data.resources)
      })
      .catch(err => console.error(err))

      console.log('found ' + this.resources.length + ' resources');
  }

  // unfiltered resource list
  getTotalCount = () => {
    return this.resources.length;
  }

  isLoaded = () => {
    return (this.resources.length > 0);
  }

  getFilteredResources = refKey => {

    // this.resources.filter(res => res.context.custom.ref === refKey)
    return this.resources.filter(res => res.public_id.includes(refKey));

  }

}


const onsiteLibrary = new OnsiteLibrary(true);


export const getImageSeries = refKey => {
  if (!onsiteLibrary.isLoaded()) {
    onsiteLibrary.init();
  }
  const resources = onsiteLibrary.getFilteredResources(refKey);
  const series = flattenResources(resources);
  return series.sort(cpidSort);
}


