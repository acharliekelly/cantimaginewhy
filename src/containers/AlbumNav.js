import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { FILTER_MODE } from 'Constants';
import { 
  selectGallery, 
  selectMode,
  clearGallery,
  fetchGalleries
} from '../redux/actions';
import AlbumNav from '../components/Navs/AlbumNav';

const mapStateToProps = (state = INITIAL_STATE) => ({
  isLoading: state.navigator.isFetching,
  error: state.navigator.error,
  albums: state.navigator.galleries,
  selectedNav: state.navigator.selectedGallery,
  navDescription: state.navigator.modeDescription
});

const updateNavSwitch = () => {
  selectMode(FILTER_MODE);
  clearGallery();
  fetchGalleries(FILTER_MODE);
}

const actionCreators = {
  updateSelectNav: tagObj => selectGallery(tagObj.tag),
  updateNavSwitch
};

export default connect(mapStateToProps, actionCreators)(AlbumNav);

