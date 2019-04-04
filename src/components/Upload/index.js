import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Radio, Input } from 'antd';

import './index.css';

const RadioGroup = Radio.Group;

class Upload extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ctype: 0,
      prefix: '',
    };
  }
  onChangeCtype = (e) => {
    this.setState({ ctype: e.target.value });
  }
  onChangePrefix = (e) => {
    this.setState({ prefix: e.target.value });
  }
  render () {
    return (
      <div className="upload-container">
        <div className="upload-title">
          <span>上传文件</span>
          <Icon type="close" className="upload-close" onClick={this.props.onBack} />
        </div>
        <div className="upload-content">
          <div className="upload-body">
            Upload Body
          </div>
          <div className="upload-config">
            <div className="upload-config-item">
              <div>选择上传文件存储类型:</div>
              <div>
                <RadioGroup onChange={this.onChangeCtype} value={this.state.ctype}>
                  <Radio value={0}>标准存储</Radio>
                  <Radio value={1}>低频存储</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className="upload-config-item">
              <div>设置路径前缀:</div>
              <div>
                <p>路径前缀可以用来分类文件，例如:</p>
                <p><span style={{display:'inline-block',height:'22px',color:'#fff',backgroundColor:'#8f9bb4'}}>image/jpg/</span>your-file-name.jpg</p>
              </div>
              <div>
                <Input onChange={this.onChangePrefix} value={this.state.prefix} placeholder="默认为空" />
              </div>
            </div>
          </div>
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
