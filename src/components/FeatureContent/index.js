import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Select } from 'antd';
import { sizeCalculation } from '../../utils/tools';

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

class FeatureContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prefixInput: '',
      domain: '',
    };
  }
  refresh = (e) => {
    e.preventDefault();
    console.todo('refresh');
  }
  emitEmpty = (e) => {
    console.todo('emitEmpty', e);
    this.prefixInput.focus();
    this.setState({ prefixInput: '' });
    /* this.fetchBucketSource({
      bucket: this.props.bucketSelected,
      prefix: ''
    }); */
  }
  onChangePrefix = (e) => {
    console.todo('onChangePrefix', e);
    this.setState({ prefixInput: e.target.value });
    if (e.target.value === '') {
      /* this.fetchBucketSource({
        bucket: this.props.bucketSelected,
        prefix: ''
      }); */
    }
  }
  onPressEnterPrefix = (e) => {
    console.todo('onPressEnterPrefix', e);
    /* this.fetchBucketSource({
      bucket: this.props.bucketSelected,
      prefix: this.state.prefixInput
    }); */
  }
  onChangeDomain = (domain = '') => {
    console.todo('onPressEnterPrefix', domain);
    this.setState({ domain });
  }
  render () {
    const { sourceList, domains, toUpload, } = this.props;
    const { prefixInput, domain, } = this.state;

    let fsizeTotal = sourceList.reduce((acc, cur) => acc + (cur['fsize'] || 0), 0);
    return (
      <div>
        <div className="feature-bar">
          <Button size="small" icon="cloud-upload" onClick={ toUpload }>Upload</Button>
          <Button style={ featureStyle } size="small" icon="reload" onClick={ this.refresh }>Refresh</Button>
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
        <div className="feature-bar">
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
      </div>
    );
  }
}

FeatureContent.propTypes = {
  sourceList: PropTypes.array,
  domains: PropTypes.array,
};

FeatureContent.defaultProps = {
  sourceList: [],
  domains: [],
};

export default FeatureContent;
