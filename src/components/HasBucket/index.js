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

  fetchBucketSource = ({ bucket, prefix }) => {
    this.props.fetchBucketSource({ bucket, prefix }).then(() => {
      // console.todo('Fetch bucket source list successfully!');
    }).catch(err => {
      console.error(err);
    });
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
            onChangeDomain={this.onChangeDomain}/>
        </div>
        <div className="table-container">
          <TableContent />
        </div>
        {/* <p><input type="button" value="Upload" onClick={toUpload}/></p>
        <h1>{ bucket }</h1> */}
      </div>
    );
  }
}

HasBucket.propTypes = {
  toUpload: PropTypes.func,
  domains: PropTypes.array,
  fetchBucketSource: PropTypes.func.isRequired,
};

HasBucket.defaultProps = {
  toUpload: null,
  domains: [],
};

export default HasBucket;
