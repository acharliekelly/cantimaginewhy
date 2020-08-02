import { connect } from 'react-redux';
import { zoomImageSrc, getContextProperty }from 'Api/cloudinaryApi';
import { nextIndex, prevIndex } from '../utils/stateUtils';

import {
  openLightbox,
  closeLightbox,
  selectImage,
  nextImage,
  previousImage
} from '../redux/actions';
import ImageZoom from '../components/ImageZoom/index';

const getTitle = state => getContextProperty(
  state.imageList[state.currentIndex], 'caption'
);
const getCaption = state => getContextProperty(
  state.imageList[state.currentIndex], 'alt'
);
const getMainImg = state => zoomImageSrc(
  state.imageList[state.currentIndex]
);
const getNextImg = state => zoomImageSrc(
  state.imageList[nextIndex(state.imageList, state.currentIndex)]
);
const getPrevImg = state => zoomImageSrc(
  state.imageList[prevIndex(state.imageList, state.currentIndex)]
);

const mapStateToProps = state => ({
  context: state.context,
  imageList: state.imageList,
  currentIndex: state.currentIndex,
  error: state.error,
  isLoading: state.isFetching,
  title: getTitle(state),
  caption: getCaption(state),
  mainImg: getMainImg(state),
  nextImg: getNextImg(state),
  prevImg: getPrevImg(state)
});


const actionCreators = {
  openLightbox,
  closeLightbox,
  selectImage,
  moveNext: nextImage,
  movePrevious: previousImage
};

export default connect(mapStateToProps, actionCreators)(ImageZoom);

