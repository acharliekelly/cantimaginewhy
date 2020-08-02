import { connect } from 'react-redux';
import AboutPage from '../components/AboutPage';

import { INITIAL_STATE } from '../redux/reducers/initialStateTree';

const mapStateToProps = (state = INITIAL_STATE) => ({
  aboutInfo: state.aboutInfo
});

export default connect(mapStateToProps)(AboutPage);