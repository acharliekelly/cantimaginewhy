import { connect } from 'react-redux';
import { selectImage } from '../redux/actions/index';
import { PROGRESS_CONTEXT } from '../utils/constants';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import ThumbGallery from '../components/ThumbGallery';

const mapStateToProps = (state = INITIAL_STATE) => ({
  galleryImages: state.progressGallery.imageList,
  currentIndex: state.progressGallery.currentIndex
});

const selectThumbnail = index => {
  selectImage(PROGRESS_CONTEXT, index);
}

const actionCreators = {
  selectThumbnail
};

export default connect(mapStateToProps, actionCreators)(ThumbGallery);