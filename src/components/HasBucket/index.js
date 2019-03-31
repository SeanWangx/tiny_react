import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon } from 'antd';
import { sizeCalculation, dateFormat } from '../../utils/tools';

import './index.css';

const featureStyle = {
  margin: '0 0 0 10px',
  fontSize: '12px'
};

const fsizeConvert = fsize => {
  let fsizeObj = sizeCalculation(fsize);
  return `${fsizeObj.size} ${fsizeObj.unit}`;
};

const columns = [
  {
    title: '文件名',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '文件类型',
    dataIndex: 'mimeType',
    key: 'mimeType'
  },
  {
    title: '存储类型',
    dataIndex: 'type',
    key: 'type',
    render: type => <span>{ type === 0 ? '标准存储' : '低频存储' }</span>
  },
  {
    title: '文件大小',
    dataIndex: 'fsize',
    key: 'fsize',
    render: fsize => <span>{ fsizeConvert(fsize) }</span>
  },
  {
    title: '最近更新事件',
    dataIndex: 'putTime',
    key: 'putTime',
    render: putTime => <span>{ dateFormat(putTime / 10000) }</span>
  }
];

class HasBucket extends Component {
  constructor (props) {
    super(props);
    this.state = { prefixInput: '' };
  }
  emitEmpty = () => {
    this.prefixInput.focus();
    this.setState({ prefixInput: '' });
  }
  onChangePrefix = (e) => {
    this.setState({ prefixInput: e.target.value });
  }
  refeshSourceList = (e) => {
    e.preventDefault();
    console.todo('refresh source list');
  }
  render () {
    const {
      // bucket,
      sourceList,
      toUpload,
    } = this.props;
    let fsizeTotal = sourceList.reduce((acc, cur) => acc + (cur['fsize'] || 0), 0);
    const { prefixInput } = this.state;
    const suffix = prefixInput ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div className="has-bucket">
        <div className="feature-container">
          <Button size="small" icon="cloud-upload" onClick={ toUpload }>Upload</Button>
          <Button style={ featureStyle } size="small" icon="reload" onClick={ this.refeshSourceList }>Refresh</Button>
          <span style={ featureStyle }>{`共${ sourceList.length }个文件`}</span>
          <span style={ featureStyle }>{`共${ fsizeConvert(fsizeTotal) }存储量`}</span>
          <Input
            style={{width: '200px', position: 'absolute', right: '0', top: '0'}}
            size="small"
            placeholder="输入前缀搜索"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={prefixInput}
            onChange={this.onChangePrefix}
            ref={node => this.prefixInput = node} />
        </div>
        <div className="feature-container"></div>
        <div className="table-container">
          <Table columns={columns} dataSource={sourceList} size="middle" />
        </div>
        {/* <p><input type="button" value="Upload" onClick={toUpload}/></p>
        <h1>{ bucket }</h1> */}
      </div>
    );
  }
}

HasBucket.propTypes = {
  // bucket: PropTypes.string,
  sourceList: PropTypes.array,
  toUpload: PropTypes.func
};

HasBucket.defaultProps = {
  // bucket: '',
  sourceList: [],
  toUpload: null
};

export default HasBucket;
