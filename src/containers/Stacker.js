import { connect } from 'react-redux';
import {
  selectGallery,
  fetchMainGallery,
  fetchAlbumExplanation,
  fetchProgressGallery,
  fetchGeoData
} from '../redux/actions';
import { INITIAL_STATE } from '../redux/reducers';
import { getThumbnailSize } from 'Utils/imageUtils';
import Stacker from '../components/Stacker';

const mapStateToProps = (state = INITIAL_STATE) => ({
  tagObject: state.navigator.selectGallery, 
  referenceKey: state.imageDetail.referenceKey, 
  isFullWidth: state.viewPort <= 500,
  galleryImages: state.primaryGallery.imageList,
  thumbSize: getThumbnailSize(state.primaryGallery.imageList.length)
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