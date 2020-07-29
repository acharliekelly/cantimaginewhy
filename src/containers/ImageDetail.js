import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers';
import { 
  selectImage,
  openLightbox,
  closeLightbox 
} from '../redux/actions/';
import { MAIN_CONTEXT, FULL_WIDTH_MINIMUM } from '../utils/constants';
import ImageDetail from '../components/ImageDetail';

const mapStateToProps = (state = INITIAL_STATE) => ({
  imageList: state.primaryGallery.imageList,
  currentIndex: state.primaryGallery.currentIndex,
  isFullWidth: state.viewPort <= FULL_WIDTH_MINIMUM
});

const nextImage = (imageList, currentIndex) => {
  const next = (currentIndex + 1) % imageList.length;
  selectImage(MAIN_CONTEXT, next);
}

const prevImage = (imageList, currentIndex) => {
  const prev = (currentIndex + imageList.length - 1) % imageList.length;
  selectImage(MAIN_CONTEXT, prev);
}

const actionCreators = {
  nextImage,
  prevImage,
  openLightbox,
  closeLightbox
}

export default connect(mapStateToProps, actionCreators)(ImageDetail);

