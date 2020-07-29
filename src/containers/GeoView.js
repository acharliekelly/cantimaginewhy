import { connect } from 'react-redux';
import { INITIAL_STATE } from '../redux/reducers';
import GeoView from '../components/GeoView';

const mapStateToProps = (state = INITIAL_STATE) => ({
  available: state.geoData.available,
  latitude: state.geoData.latitude,
  longitude: state.geoData.longitude
});


export default connect(mapStateToProps)(GeoView);