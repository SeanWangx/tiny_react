import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const HasBucket = ({ bucket, onUpload }) => (
  <div>
    <h1>{ bucket }</h1>
    <p><input type="button" value="Upload" onClick={onUpload}/></p>
  </div>
);

HasBucket.propTypes = {
  bucket: PropTypes.string,
  onUpload: PropTypes.func
};

HasBucket.defaultProps = {
  bucket: '',
  onUpload: null
};

export default HasBucket;
