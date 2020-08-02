import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { 
  openLightbox,
  closeLightbox,
  nextImage,
  prevImage 
} from '../redux/actions/';
import ImageDetail from '../components/ImageDetail';

const mapStateToProps = (state = INITIAL_STATE, ownProps) => ({
  imageList: state.primaryGallery.imageList,
  currentIndex: state.primaryGallery.currentIndex,
  isFullWidth: ownProps.isFullWidth
});

const actionCreators = {
  nextImage,
  prevImage,
  openLightbox,
  closeLightbox
}

export default connect(mapStateToProps, actionCreators)(ImageDetail);

