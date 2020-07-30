import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { selectGallery } from '../redux/actions';
import MobileNav from '../components/Navs/MobileNav';

const mapStateToProps = (state = INITIAL_STATE) => ({
  isLoading: state.navigator.isFetching,
  error: state.navigator.error,
  albums: state.navigator.galleries,
  selectedNav: state.navigator.selectedGallery,
  navDescription: state.navigator.modeDescription
});

const actionCreators = {
  updateSelectNav: tagObj => selectGallery(tagObj.tag)
};

export default connect(mapStateToProps, actionCreators)(MobileNav);

