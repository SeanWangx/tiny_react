import { connect } from 'react-redux';
import BucketSetting from '../components/BucketSetting';

const mapStateToProps = (state, ownProps) => ({
  accessKey: state.accessKey
})

const mapDispatchToProps = (dispath, ownProps) => ({})

const SettingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketSetting);

export default SettingPage;
