import { connect } from 'react-redux';
import Sider from '../components/Sider';
import { fetchBucketList, createBucket } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBucketList: () => {
    return dispatch(fetchBucketList());
  },
  createBucket: ({ name, region }) => {
    return dispatch(createBucket({ name, region }));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sider);
