import { connect } from 'react-redux';
import { } from '../redux/actions';
import { INITIAL_STATE } from '../redux/reducers';
import ImageInfo from '../components/ImageInfo';

const mapStateToProps = (state = INITIAL_STATE) => ({
  currentImage: state.imageDetail
});

export default connect(mapStateToProps)(ImageInfo);