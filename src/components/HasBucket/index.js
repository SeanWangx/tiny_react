import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { sizeCalculation, dateFormat } from '../../utils/tools';

import './index.css';

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
  render () {
    const {
      bucket,
      sourceList,
      toUpload,
    } = this.props;
    console.todo(sourceList);
    return (
      <div className="has-bucket">
        {/* <p><input type="button" value="Upload" onClick={toUpload}/></p>
        <h1>{ bucket }</h1> */}
        <Table columns={columns} dataSource={sourceList} />
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
