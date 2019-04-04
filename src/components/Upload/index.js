import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import './index.css';

class Upload extends Component {
  render () {
    return (
      <div className="upload-container">
        <div className="upload-title">
          <span>上传文件</span>
          <Icon type="close" className="upload-close" onClick={this.props.onBack} />
        </div>
        <div className="upload-content">
          Upload Content
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  onBack: PropTypes.func
};

Upload.defaultProps = {
  onBack: null
};

export default Upload;
