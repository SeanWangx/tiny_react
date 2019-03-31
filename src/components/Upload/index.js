import React from 'react';
import PropTypes from 'prop-types';

const Upload = ({ onBack }) => (
  <div>
    <h1>Upload</h1>
    <p><input type="button" value="Back" onClick={onBack}/></p>
  </div>
);

Upload.propTypes = {
  onBack: PropTypes.func
};

Upload.defaultProps = {
  onBack: null
};

export default Upload;
