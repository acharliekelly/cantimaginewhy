import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers';
import Explan from '../components/Explan';

const mapStateToProps = (state = INITIAL_STATE) => ({
  tagName: state.navigator.selectedGallery.name, 
  explanText: state.primaryGallery.galleryAboutText
});

export default connect(mapStateToProps)(Explan);