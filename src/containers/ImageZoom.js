import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { PROGRESS_CONTEXT, MAIN_CONTEXT } from 'Utils/constants';
import {
  openLightbox,
  closeLightbox,
  selectImage,
  nextImage,
  previousImage
} from '../redux/actions';
import ImageZoom from '../components/ImageZoom/alt';

const contextProps = (state, context) => {
  switch (context) {
    case MAIN_CONTEXT:
      return state.primaryGallery;
    case PROGRESS_CONTEXT:
      return state.progressGallery;
    default:
      return state.featuredGallery;
  }
}

const mapStateToProps = (state = INITIAL_STATE, ownProps) => ({
  context: ownProps.context,
  imageList: contextProps(state, ownProps.context).imageList,
  currentIndex: contextProps(state, ownProps.context).currentIndex,
  error: contextProps(state, ownProps.context).error,
  isLoading: contextProps(state, ownProps.context).isFetching,
});


const actionCreators = {
  openLightbox,
  closeLightbox,
  selectImage,
  moveNext: nextImage,
  movePrevious: previousImage
};

export default connect(mapStateToProps, actionCreators)(ImageZoom);

