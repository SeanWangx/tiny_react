import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Select, Divider, Dropdown } from 'antd';
import { sizeCalculation, dateFormat } from '../../utils/tools';
import menu from './menu';
import './index.css';

const { Option } = Select;
const { Column } = Table;

const featureStyle = {
  margin: '0 0 0 10px',
  fontSize: '12px'
};

const fsizeConvert = fsize => {
  let fsizeObj = sizeCalculation(fsize);
  return `${fsizeObj.size} ${fsizeObj.unit}`;
};

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
          <span style={ featureStyle }>
            {
              domains.length === 0 ? (
                <Icon type="info-circle" style={{ cursor: 'pointer', color: 'red' }}/>
              ) : null
            }
          </span>
        </div>
        <div className="table-container">
          <Table dataSource={ sourceList } size="middle">
          <Column
            title="文件名"
            dataIndex="key"
            key="key" />
          <Column
            title="文件类型"
            dataIndex="mimeType"
            key="mimeType"
            width={150}/>
          <Column 
            title="存储类型"
            dataIndex="type"
            key="type"
            width={86}
            render={type => (<span>{type === 0 ? '标准存储' : '低频存储'}</span>)}
          />
          <Column
            title="文件大小"
            dataIndex="fsize"
            key="fsize"
            width={110}
            render={fsize => (<span>{ fsizeConvert(fsize) }</span>)}
          />
          <Column
            title="最近更新时间"
            dataIndex="putTime"
            key="putTime"
            width={200}
            render={putTime => (<span>{ dateFormat(putTime / 10000) }</span>)}
          />
          <Column
            title="操作"
            key="action"
            width={108}
            render={(text, record) => {
              return (
                <span>
                  <a href="javascript:;">
                    {
                      this.state.domain ? (<Icon type="eye" />) : (<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="eye-invisible" />)
                    }
                  </a>
                  <Divider type="vertical" />
                  <Dropdown overlay={menu(this.props.bucketSelected, record['key'], !!this.state.domain)} trigger={['click']}>
                    <a href="javascript:;">
                      More <Icon type="down" />
                    </a>
                  </Dropdown>
                </span>
              );
            }}
          />
          </Table>
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
