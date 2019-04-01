import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Select } from 'antd';
import { sizeCalculation, dateFormat } from '../../utils/tools';

import './index.css';

const { Option } = Select;

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
    title: '最近更新时间',
    dataIndex: 'putTime',
    key: 'putTime',
    render: putTime => <span>{ dateFormat(putTime / 10000) }</span>
  }
];

class HasBucket extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prefixInput: '',
      domain: '',
    };
  }
  emitEmpty = () => {
    this.prefixInput.focus();
    this.setState({ prefixInput: '' });
    this.fetchBucketSource({
      bucket: this.props.bucketSelected,
      prefix: ''
    });
  }
  onChangePrefix = (e) => {
    this.setState({ prefixInput: e.target.value });
    if (e.target.value === '') {
      this.fetchBucketSource({
        bucket: this.props.bucketSelected,
        prefix: ''
      });
    }
  }
  onPressEnterPrefix = (e) => {
    this.fetchBucketSource({
      bucket: this.props.bucketSelected,
      prefix: this.state.prefixInput
    });
  }
  refeshSourceList = (e) => {
    e.preventDefault();
    this.fetchBucketSource({
      bucket: this.props.bucketSelected,
      prefix: this.state.prefixInput
    });
  }
  fetchBucketSource = ({ bucket, prefix }) => {
    // separate the function for fetch bucket source
    this.props.fetchBucketSource({ bucket, prefix }).then(() => {
      // console.todo('Fetch bucket source list successfully!');
    }).catch(err => {
      console.error(err);
    });
  }
  onChangeDomain = (domain = '') => {
    this.setState({ domain });
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.domains !== this.props.domains) {
      this.setState({ domain: this.props.domains[0] || '' });
    }
  }
  render () {
    const {
      prefixInput,
      domain,
    } = this.state;
    const {
      domains,
      sourceList,
      toUpload,
    } = this.props;
    let fsizeTotal = sourceList.reduce((acc, cur) => acc + (cur['fsize'] || 0), 0);
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
            prefix={ <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} /> }
            suffix={ prefixInput ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null }
            value={ prefixInput }
            onChange={ this.onChangePrefix }
            onPressEnter={ this.onPressEnterPrefix }
            ref={ node => this.prefixInput = node } />
        </div>
        <div className="feature-container">
          <span>外链默认域名：</span>
          <Select size="small" style={{ width: 250 }} onChange={ this.onChangeDomain } value={ domain }>
            {
              domains.map((v, index) => (<Option key={ index } value={ v }>{ v }</Option>))
            }
          </Select>
        </div>
        <div className="table-container">
          <Table columns={ columns } dataSource={ sourceList } size="middle" />
        </div>
        {/* <p><input type="button" value="Upload" onClick={toUpload}/></p>
        <h1>{ bucket }</h1> */}
      </div>
    );
  }
}

HasBucket.propTypes = {
  bucketSelected: PropTypes.string,
  sourceList: PropTypes.array,
  toUpload: PropTypes.func,
  domains: PropTypes.array,
  fetchBucketSource: PropTypes.func.isRequired,
};

HasBucket.defaultProps = {
  bucketSelected: '',
  sourceList: [],
  toUpload: null,
  domains: [],
};

export default HasBucket;