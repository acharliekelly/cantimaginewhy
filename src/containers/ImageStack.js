import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import Stacker from '../components/Stacker/';


/**
 * ImageStack
 * Right-side Accordion component
 * holds Image content  
 *  - Image details
 *  - Artistic Process gallery
 *  - Location info
 *  - Related Galleries list
 *  - Product info
 */

const mapStateToProps = (state = INITIAL_STATE, ownProps) => ({
  defaultKey: 'info',
  hasImageInfo: !!state.currentImage.rawData.context,
  hasProductInfo: !!state.currentImage.productInfo,
  hasGeoData: !!state.currentImage.geoData,
  hasProgressGallery: !!state.currentImage.progressGallery,
  hasRelatedGalleries: !!state.currentImage.relatedGalleries,
  maxHeight: ownProps.maxHeight
});


export default connect(mapStateToProps)(Stacker);