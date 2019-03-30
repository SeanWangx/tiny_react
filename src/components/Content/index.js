import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoBucket from '../../containers/NoBucket';

import './index.css';

const Upload = ({ onBack }) => (
  <div>
    <h1>Upload</h1>
    <p><input type="button" value="Back" onClick={onBack}/></p>
  </div>
);
const HasBucket = ({ bucket, onUpload }) => (
  <div>
    <h1>{ bucket }</h1>
    <p><input type="button" value="Upload" onClick={onUpload}/></p>
  </div>
);

class Content extends Component {
  constructor (props) {
    super(props);
    this.state = {
      view: 'source', // or 'upload'
    };
  }
  back = (e) => {
    e.preventDefault();
    this.setState({ view: 'source' });
  }
  upload = (e) => {
    e.preventDefault();
    this.setState({ view: 'upload' });
  }
  render () {
    return (
      <div className="bucket-content">
        {
          this.props.bucketSelected === ''
            ? <NoBucket />
            : (
              this.state.view === 'upload'
                ? <Upload onBack={this.back}/>
                : <HasBucket bucket={this.props.bucketSelected} onUpload={this.upload}/>
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
