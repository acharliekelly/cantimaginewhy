// put this in separate library to avoid cluttering App.js
// also, need to run for Storybook icons to work
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';

import {
  faBloggerB,
  faFlickr,
  faInstagram,
  faFacebook,
  faGithub,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

// generic
import { 
  faBars, 
  faBlog,
  faCamera,
  faCheck,
  faChevronLeft, 
  faChevronRight, 
  faClock,
  faCode,
  faCog, 
  faDove,
  faDraftingCompass,
  faEllipsisV,
  faExclamationTriangle,
  faExternalLinkAlt,
  faFileAlt,
  faFileCode,
  faFilter,
  faFolderOpen,
  faFont,
  faHome,
  faHeart,
  faHistory,
  faIcons,
  faIdCard,
  faImage,
  faImages,
  faLeaf,
  faListOl,
  faMapMarkerAlt,
  faMapMarkedAlt,
  faPaintBrush,
  faPalette,
  faPaperPlane,
  faProjectDiagram,
  faQuestionCircle,
  faSkull,
  faStar,
  faShoppingCart,
  faSearchPlus,
  faSitemap,
  faSort,
  faSortUp,
  faSortDown,
  faTag,
  faUserCircle,
  faUserFriends
 } from '@fortawesome/free-solid-svg-icons';


 export const initializeLibrary = () => {
  library.add(faCode, faBars, faChevronLeft, faChevronRight, 
    faCheck, faCog, faHeart, faPaperPlane, faShoppingCart, 
    faImage, faQuestionCircle, faSearchPlus, faBlog,
    faFilter, faSort, faImages, faExternalLinkAlt, 
    faEllipsisV, faFileAlt, faFileCode, faFolderOpen,
    faSortUp, faSortDown, faPaintBrush, faPalette,
    faMapMarkedAlt, faMapMarkerAlt, faDraftingCompass,
    faDove, faIcons, faLeaf, faHome, faProjectDiagram, 
    faSitemap, faIdCard, faUserCircle, faUserFriends,
    faStar, faCamera, faHistory, faClock, faFont, faTag, 
    faListOl, faSkull, faExclamationTriangle,
    faBloggerB, faFlickr, faInstagram, faFacebook,
    faGithub, faLinkedin );
 }

 