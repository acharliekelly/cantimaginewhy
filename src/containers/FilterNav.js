import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { ALBUM_MODE, FILTER_MODE } from '../utils/constants';
import { 
  selectMode,
  selectFilter,
  selectGallery,
  clearGallery,
  fetchGalleries
} from '../redux/actions';
import FilterNav from '../components/Navs/FilterNav';

export const navigator = {
  isFetching: false,
  mode: ALBUM_MODE,
  modeDescription: '',
  galleryGroups: [],
  filterIndex: 0,
  galleries: [],
  thumbSize: 80,
  selectedGallery: {
    name: '',
    tag: '',
    thumbnail: '',
    description: '',
    sortField: '.completed',
    sortDir: 'desc',
  },
  error: null
}

const mapStateToProps = (state = INITIAL_STATE) => ({
  isLoading: state.navigator.isFetching,
  error: state.navigator.error,
  filters: state.navigator.galleryGroups,
  filterIndex: state.navigator.filterIndex,
  filterOptions: state.navigator.galleries,
  selectedNav: state.navigator.selectedGallery,
  thumbSize: state.navigator.thumbSize
});

const setFilterIndex = index => {
  selectFilter(index);
  clearGallery();
  fetchGalleries(FILTER_MODE, index);
}

const updateNavSwitch = () => {
  selectMode(ALBUM_MODE);
  clearGallery();
  fetchGalleries(ALBUM_MODE);
}

const actionCreators = {
  updateNavSwitch,
  setFilterIndex,
  updateSelectNav: tagObj => selectGallery(tagObj.tag),
  updateClearGallery: clearGallery
};

export default connect(mapStateToProps, actionCreators)(FilterNav);

