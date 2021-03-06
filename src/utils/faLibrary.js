// put this in separate library to avoid cluttering App.js
// also, need to run for Storybook icons to work
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
  faBars, 
  faChevronLeft, 
  faChevronRight, 
  faCheck, 
  faCog, 
  faHeart,
  faPaperPlane,
  faImage,
  faShoppingCart,
  faQuestionCircle,
  faSearchPlus,
  faBlog,
  faFilter,
  faSort,
  faImages,
  faExternalLinkAlt,
  faEllipsisV,
  faFileCode,
  faFileAlt,
  faSortUp,
  faSortDown,
  faPaintBrush,
  faPalette,
  faFolderOpen,
  faMapMarkerAlt,
  faMapMarkedAlt,
  faDraftingCompass
 } from '@fortawesome/free-solid-svg-icons';



 export const initializeLibrary = () => {
  library.add(fab, faBars, faChevronLeft, faChevronRight, 
    faCheck, faCog, faHeart, faPaperPlane, faShoppingCart, 
    faImage, faQuestionCircle, faSearchPlus, faBlog,
    faFilter, faSort, faImages, faExternalLinkAlt, 
    faEllipsisV, faFileAlt, faFileCode, faFolderOpen,
    faSortUp, faSortDown, faPaintBrush, faPalette,
    faMapMarkedAlt, faMapMarkerAlt, faDraftingCompass);
 }

 