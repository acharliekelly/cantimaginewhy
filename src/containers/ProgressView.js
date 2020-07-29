import { connect } from 'react-redux';
import ProgressView from '../components/ProgressView';
import { INITIAL_STATE } from '../redux/reducers';
import { selectImage, openLightbox, closeLightbox } from '../redux/actions';
import { PROGESS_CONTEXT } from '../utils/constants';

const mapStateToProps = (state = INITIAL_STATE) => ({
  progressImages: state.progressGallery.imageList,
  progressIndex: state.progressGallery.currentIndex
});

const nextImage = (imageList, index) => {
  const next = (index + 1) % imageList.length;
  selectImage(PROGESS_CONTEXT, next);
}

const prevImage = (imageList, index) => {
  const prev = (index + imageList.length - 1) % imageList.length;
  selectImage(PROGESS_CONTEXT, prev);
}

const setProgressIndex = index => {
  selectImage(PROGESS_CONTEXT, index);
}

const actionCreators = {
  setProgressIndex,
  nextImage,
  prevImage,
  openLightbox,
  closeLightbox
}

export default connect(mapStateToProps, actionCreators)(ProgressView);
