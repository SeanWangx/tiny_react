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
    };
  }
  refresh = (e) => {
    e.preventDefault();
    this.props.onFetch(this.state.prefixInput);
  }
  emitEmpty = (e) => {
    e.preventDefault();
    this.prefixInput.focus();
    this.setState({ prefixInput: '' });
    this.props.onFetch();
  }
  onChangePrefix = (e) => {
    e.preventDefault();
    this.setState({ prefixInput: e.target.value });
    if (e.target.value === '') {
      this.props.onFetch();
    }
  }
  onPressEnterPrefix = (e) => {
    e.preventDefault();
    this.props.onFetch(this.state.prefixInput);
  }
  render () {
    let fsizeTotal = this.props.sourceList.reduce((acc, cur) => acc + (cur['fsize'] || 0), 0);

    return (
      <div>
        <div className="feature-bar">
          <Button size="small" icon="cloud-upload" onClick={ this.props.toUpload }>Upload</Button>
          <Button style={ featureStyle } size="small" icon="reload" onClick={ this.refresh }>Refresh</Button>
          <span style={ featureStyle }>{`共${ this.props.sourceList.length }个文件`}</span>
          <span style={ featureStyle }>{`共${ fsizeConvert(fsizeTotal) }存储量`}</span>
          <Input
            style={{width: '200px', position: 'absolute', right: '0', top: '0'}}
            size="small"
            placeholder="输入前缀搜索"
            prefix={ <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} /> }
            suffix={ this.state.prefixInput ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null }
            value={ this.state.prefixInput }
            onChange={ this.onChangePrefix }
            onPressEnter={ this.onPressEnterPrefix }
            ref={ node => this.prefixInput = node } />
        </div>
        <div className="feature-bar">
          <span>外链默认域名：</span>
          <Select size="small" style={{ width: 250 }} onChange={ this.props.onChangeDomain } value={ this.props.domain }>
            {
              this.props.domains.map((v, index) => (<Option key={ index } value={ v }>{ v }</Option>))
            }
          </Select>
          <span style={ featureStyle }>
            {
              this.props.domains.length === 0 ? (
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
  // from containers props
  sourceList: PropTypes.array,
  domains: PropTypes.array,
  // from own props
  toUpload: PropTypes.func,
  onFetch: PropTypes.func,
  onChangeDomain: PropTypes.func,
  domain: PropTypes.string,
};

FeatureContent.defaultProps = {
  sourceList: [],
  domains: [],

  toUpload: null,
  onFetch: null,
  onChangeDomain: null,
  domain: '',
};

export default FeatureContent;
