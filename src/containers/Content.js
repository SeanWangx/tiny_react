import { connect } from 'react-redux';
import Content from '../components/Content';

const mapStateToProps = (state, ownProps) => ({
  selected: state.selected
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
