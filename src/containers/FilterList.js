import { connect } from 'react-redux';
import FilterList from '../components/FilterList';

const mapStateToProps = (state, ownProps) => ({
  buckets: state.buckets
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);
