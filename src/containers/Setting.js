import { connect } from 'react-redux';
import Setting from '../components/Setting';
import { logout } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  accessKey: state.baseConfig.accessKey
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(logout());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
