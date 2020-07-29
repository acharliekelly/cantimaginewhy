import { connect } from 'react-redux';
import AboutPage from '../components/AboutPage';
import { aboutContent } from '../json/text';

import { INITIAL_STATE } from '../redux/reducers';

const mapStateToProps = (state = INITIAL_STATE) => ({
  isFetching: false,
  contentText: aboutContent,
  error: null
});

export default connect(mapStateToProps)(AboutPage);