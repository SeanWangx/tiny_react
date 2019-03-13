import { connect } from 'react-redux';
import Setting from '../components/Setting';
import { deleteMac } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  accessKey: state.accessKey
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(deleteMac());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
