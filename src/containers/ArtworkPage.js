import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import { FILTER_MODE } from 'Constants';
import ArtworkPage from '../components/ArtworkPage';

const mapStateToProps = (state = INITIAL_STATE) => ({
  isFilter: state.navigator.mode === FILTER_MODE,
  selectedGallery: state.navigator.selectedGallery
});


export default connect(mapStateToProps)(ArtworkPage);