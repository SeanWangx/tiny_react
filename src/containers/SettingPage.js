import { connect } from 'react-redux';
import BucketSetting from '../components/BucketSetting';
import { deleteMac } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  accessKey: state.accessKey
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(deleteMac());
  }
})

const SettingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketSetting);

export default SettingPage;
