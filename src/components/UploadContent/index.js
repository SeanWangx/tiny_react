import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Radio, Input, Upload, Button } from 'antd';
import qiniu from '../../utils/qiniu';

import './index.css';

const RadioGroup = Radio.Group;

const ZONE_UPLOAD = {
  'z0': 'up.qiniup.com',
  'z1': 'up-z1.qiniup.com',
  'z2': 'up-z2.qiniup.com',
  'na0': 'up-na0.qiniup.com',
  'as0': 'up-as0.qiniup.com'
};

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
  beforeUpload = (file) => {
    if (file.size && (file.size > 1024 * 1024 * 500)) {
      console.error('文件大小超出尺寸，上传失败！');
      return false;
    }
    let key = this.state.prefix + file.name;
    let options = {
      scope: `${this.props.bucketSelected}:${key}`,
      fileType: this.state.ctype,
    };
    let uploadToken = qiniu.getUploadToken(options);
    this.setState({
      uploadData: {
        key,
        token: uploadToken,
      }
    });
    return true;
  }
  componentDidMount () {
    this.setState({
      uploadURL: `http://${ZONE_UPLOAD[this.props.zone]}` || '',
    });
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
              data={this.state.uploadData}
              action={this.state.uploadURL}
              beforeUpload={this.beforeUpload}>
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
  // from containers props
  bucketSelected: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  // from own props
  onBack: PropTypes.func,
};

UploadContent.defaultProps = {
  onBack: null,
};

export default UploadContent;
