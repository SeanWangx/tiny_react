import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Radio, Input, Upload, Button } from 'antd';

import './index.css';

const RadioGroup = Radio.Group;

class UploadContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ctype: 0,
      prefix: '',
      uploadURL: '', // 上传路径
      uploadData: {
        key: '', // 文件名
        token: '',
      }, // 上传参数
    };
  }
  onChangeCtype = (e) => {
    this.setState({ ctype: e.target.value });
  }
  onChangePrefix = (e) => {
    this.setState({ prefix: e.target.value });
  }
  componentDidMount () {
    console.todo('upload mount');
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
            <Upload
              data={null}
              action={null}>
              <Button type="primary">
                选择文件
              </Button>
              <p className="upload-tip">网页不能上传超过 500M 的文件，大文件请<span onClick={null}> 使用工具 </span>上传</p>
            </Upload>
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

UploadContent.propTypes = {
  onBack: PropTypes.func
};

UploadContent.defaultProps = {
  onBack: null
};

export default UploadContent;
