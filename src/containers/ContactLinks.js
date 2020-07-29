import { connect } from 'react-redux';
import ContactLinks from '../components/ContactLinks';
import { INITIAL_STATE } from '../redux/reducers'

const mapStateToProps = (state = INITIAL_STATE) => ({
  sectionId: state.contactInfo.currentSection,
  sectionLinks: state.contactInfo.connectLinks[state.contactInfo.currentSection]
});

export default connect(mapStateToProps)(ContactLinks);

