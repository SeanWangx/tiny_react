import { connect } from 'react-redux';
import Manager from '../components/Manager';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.baseConfig.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager);
