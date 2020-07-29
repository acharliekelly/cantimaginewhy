import { connect } from 'react-redux';
import { openLightbox } from 'Redux/actions/';
import { FEATURED_CONTEXT } from 'Contexts';
import SliceGallery from 'Comps/SliceGallery';

const mapStateToProps = (state, ownProps ) => ({
  isFetching: state.featuredGallery.isFetching,
  imagesList: state.featuredGallery.imagesList,
  currentIndex: state.featuredGallery.currentIndex,
  error: state.featuredGallery.error,
  gallerySize: ownProps.gallerySize,
  imageHeight: ownProps.imageHeight,
});

const showLightbox = () => openLightbox(FEATURED_CONTEXT); 

const actionCreators = {
  showLightbox
};

export default connect(mapStateToProps, actionCreators)(SliceGallery);