import * as reactRedux from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { 
  selectImage,
  openLightbox,
  closeLightbox 
} from '../redux/actions/';
import { MAIN_CONTEXT } from '../utils/constants';
import ImageDetail from '../components/ImageDetail';

const mapStateToProps = (state = INITIAL_STATE, ownProps) => ({
  imageList: state.primaryGallery.imageList,
  currentIndex: state.primaryGallery.currentIndex,
  isFullWidth: ownProps.isFullWidth
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

export default reactRedux.connect(mapStateToProps, actionCreators)(ImageDetail);

