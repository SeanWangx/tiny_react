import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeatureContent from '../../containers/FeatureContent';
import TableContent from '../../containers/TableContent';
import './index.css';

class HasBucket extends Component {
  constructor (props) {
    super(props);
    this.state = {
      domain: '',
    };
  }
  onChangeDomain = (domain) => {
    this.setState({ domain });
  }
  fetchBucketSource = (prefix = '') => {
    this.props.fetchBucketSource({
      bucket: this.props.bucketSelected,
      prefix,
    }).then(() => {
      // console.todo('Fetch bucket source list successfully!');
    }).catch(err => {
      console.error(err);
    });
  }
  componentDidMount () {
    if (this.state.domain === '') {
      this.setState({ domain: this.props.domains[0] || '' });
    }
    this.fetchBucketSource();
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.domains !== this.props.domains) {
      this.setState({ domain: this.props.domains[0] || '' });
    }
  }
  render () {
    return (
      <div className="has-bucket">
        <div className="feature-container">
          <FeatureContent
            toUpload={this.props.toUpload}
            domain={this.state.domain}
            onChangeDomain={this.onChangeDomain}
            onFetch={this.fetchBucketSource}/>
        </div>
        <div className="table-container">
          <TableContent
            domain={this.state.domain}/>
        </div>
        {/* <p><input type="button" value="Upload" onClick={toUpload}/></p>
        <h1>{ bucket }</h1> */}
      </div>
    );
  }
}

HasBucket.propTypes = {
  // from containers props
  bucketSelected: PropTypes.string,
  domains: PropTypes.array,
  fetchBucketSource: PropTypes.func.isRequired,
  // from own props
  toUpload: PropTypes.func,
};

HasBucket.defaultProps = {
  bucketSelected: '',
  domains: [],
  toUpload: null,
};

export default HasBucket;
