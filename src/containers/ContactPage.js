import { connect } from 'react-redux';
import { selectSection } from 'Redux/actions/';
import { CONTACT_PAGE } from 'Constants';
import ContactPage from 'Comps/ContactPage';

const mapStateToProps = state => ({
  contactText: state.contactInfo.contactText,
  showDescription: state.view.portWidth > 1000
});

const selectContactSection = sectionId => {
  selectSection(CONTACT_PAGE, sectionId);
}

const actionCreators = {
  selectContactSection
}

export default connect(mapStateToProps, actionCreators)(ContactPage);