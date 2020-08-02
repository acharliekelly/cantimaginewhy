import { connect } from 'react-redux';
import { StateLocator } from '../utils/constants';
import { INITIAL_STATE } from '../redux/reducers/initialStateTree';
import ImageInfo from '../components/ImageInfo';
import { contextFieldLabels } from '../utils/imageContext';


export const initialData = {
  locator: StateLocator.IMAGE_DETAIL,
  caption: '',
  description: '',
  medium: '',
  size: '',
  completedOn: null
};

const mapStateToProps = (state = INITIAL_STATE) => ({
  imageData: state.currentImage.rawData.context.custom,
  contextFieldLabels
});

export default connect(mapStateToProps)(ImageInfo);