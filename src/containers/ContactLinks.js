import { connect } from 'react-redux';
import ContactLinks from '../components/ContactLinks';
import { INITIAL_STATE } from '../redux/reducers'
import { links } from '../json/links';

const mapStateToProps = (state = INITIAL_STATE.contactInfo) => ({
  isFetching: false,
  links,
  error: null
});

export default connect(mapStateToProps)(ContactLinks);

