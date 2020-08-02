import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import Stacker from '../components/Stacker/';

/**
 * Left-side Accordion component
 * holds Album content  
 *  - About Album
 *  - Thumbnail gallery
 */


const mapStateToProps = (state = INITIAL_STATE, ownProps) => ({
  defaultKey: 'gallery',
  hasAlbumInfo: !!state.primaryGalleryInfo,
  aboutAlbum: state.primaryGalleryInfo,
  hasMainGallery: !!state.primaryGallery,
  enableCarousel: state.primaryGallery.imagesList.length > 1,
  maxHeight: ownProps.maxHeight
});



export default connect(mapStateToProps)(Stacker);