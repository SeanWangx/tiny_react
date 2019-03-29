import { connect } from 'react-redux';
import Manager from '../components/Manager';
import { fetchBucketList } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.baseConfig.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBucketList: () => {
    return dispatch(fetchBucketList());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager);
