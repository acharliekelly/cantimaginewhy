import { connect } from 'react-redux';
import {
  selectGallery,
  fetchMainGallery
} from '../redux/actions';
import { INITIAL_STATE } from '../redux/reducers';
import Stacker from '../components/Stacker';

const mapStateToProps = (state = INITIAL_STATE) => ({
  tagObject: state.navigator.selectGallery, 
  referenceKey: state.imageDetail.referenceKey, 
  isFullWidth: state.viewPort <= 500,
  galleryImages: state.primaryGallery.imageList
});

const updateSelectNav = tagName => {
  selectGallery(tagName);
  fetchMainGallery(tagName);
}

const actionCreators = {
  updateSelectNav
};

export default connect(mapStateToProps, actionCreators)(Stacker);