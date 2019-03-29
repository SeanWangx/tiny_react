import { connect } from 'react-redux';
import NoBucket from '../components/NoBucket';
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
)(NoBucket);
