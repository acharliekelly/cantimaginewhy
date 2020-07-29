import { connect } from 'react-redux';
import {
  sortGallery,
  selectImage
} from '../redux/actions/index';
import { INITIAL_STATE } from '../redux/reducers';
import { MAIN_CONTEXT } from '../utils/constants';
import ThumbGallery from '../components/ThumbGallery';

const mapStateToProps = (state = INITIAL_STATE) => ({
  galleryImages: state.primaryGallery.imageList,
  currentIndex: state.primaryGallery.currentIndex
});

const selectThumbnail = index => {
  selectImage(MAIN_CONTEXT, index);
}

const actionCreators = {
  sortGallery,
  selectThumbnail
};

export default connect(mapStateToProps, actionCreators)(ThumbGallery);