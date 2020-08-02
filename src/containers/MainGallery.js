import { connect } from 'react-redux';
import {
  sortGallery,
  selectImage
} from '../redux/actions/';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { StateLocator } from '../utils/constants';
import ThumbGallery from '../components/ThumbGallery';

const mapStateToProps = (state = INITIAL_STATE) => ({
  galleryImages: state.primaryGallery.imageList,
  currentIndex: state.primaryGallery.currentIndex,
  thumbSize: state.primaryGallery.thumbSize
});

const selectThumbnail = index => {
  selectImage(StateLocator.PRIMARY_GALLERY, index);
}

const actionCreators = {
  sortGallery,
  selectThumbnail
};

export default connect(mapStateToProps, actionCreators)(ThumbGallery);