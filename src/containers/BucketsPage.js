import { connect } from 'react-redux';
import Buckets from '../components/Buckets';
import { deleteMac } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(deleteMac());
  }
})

const BucketsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Buckets);

export default BucketsPage;
