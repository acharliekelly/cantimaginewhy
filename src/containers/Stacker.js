import { connect } from 'react-redux';
import {
  selectGallery,
  fetchMainGallery,
  fetchAlbumExplanation,
  fetchProgressGallery,
  fetchGeoData
} from '../redux/actions';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
// import { FULL_WIDTH_MINIMUM } from '../utils/constants';
import { getThumbnailSize } from 'Utils/imageUtils';
import Stacker from '../components/Stacker';

const mapStateToProps = (state = INITIAL_STATE, ownProps) => ({
  tagObject: state.navigator.selectedGallery, 
  referenceKey: state.imageDetail.referenceKey, 
  isFullWidth: ownProps.isFullWidth,
  galleryImages: state.primaryGallery.imageList,
  thumbSize: getThumbnailSize(state.primaryGallery.imageList.length),
  maxHeight: ownProps.maxHeight
});

const updateSelectNav = tagName => {
  selectGallery(tagName);
  fetchMainGallery(tagName);
  fetchAlbumExplanation(tagName);
}

const actionCreators = {
  updateSelectNav,
  fetchProgressGallery,
  fetchGeoData
};

export default connect(mapStateToProps, actionCreators)(Stacker);