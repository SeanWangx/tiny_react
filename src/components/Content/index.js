import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoBucket from '../../containers/NoBucket';
import HasBucket from '../../containers/HasBucket';
import UploadContent from '../../containers/UploadContent';

import './index.css';

class Content extends Component {
  constructor (props) {
    super(props);
    this.state = {
      view: 'source', // or 'upload'
      bucket: props.bucketSelected
    };
  }
  toBack = (e) => {
    e.preventDefault();
    this.setState({ view: 'source' });
  }
  toUpload = (e) => {
    e.preventDefault();
    this.setState({ view: 'upload' });
  }
  static getDerivedStateFromProps (props, state) {
    if (props.bucketSelected !== state.bucket) {
      return {
        view: 'source',
        bucket: props.bucketSelected
      };
    }
    return null;
  }
  render () {
    return (
      <div className="bucket-content">
        {
          this.state.bucket === ''
            ? <NoBucket />
            : (
              this.state.view === 'upload'
                ? <UploadContent onBack={this.toBack}/>
                : <HasBucket toUpload={this.toUpload}/>
            )
        }
      </div>
    );
  }
}

Content.propTypes = {
  bucketSelected: PropTypes.string
};

Content.defaultProps = {
  bucketSelected: ''
};

export default Content;
