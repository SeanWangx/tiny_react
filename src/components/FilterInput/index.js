import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Modal } from 'antd';

import './index.css';

const inputStyle = {
  'backgroundColor': '#545c64',
  'color': '#fff'
};
const btnStyle = {
  'padding': '4px',
  'cursor': 'pointer'
};

class FilterInput extends Component {
  constructor (props) {
    super(props);
    this.state = {visible: false};
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
  }
  showModal () {
    this.setState({visible: true});
  }
  handleOk (e) {
    e.preventDefault();
    this.setState({visible: false});
    console.log('[TODO]ok');
  }
  handleCancel (e) {
    e.preventDefault();
    this.setState({visible: false});
    console.log('[TODO]cancel');
  }
  addBucket () {
    console.log('add bucket');
  }
  render () {
    const { onFilter } = this.props;
    return (
      <div className="filter-container">
        <div className="bucket-filter">
          <Input size="small" placeholder="Search" style={inputStyle} onChange={onFilter}/>
        </div>
        <div className="bucket-add">
          <Icon type="plus-square" style={btnStyle} onClick={this.showModal}/>
        </div>
        <Modal
          title="add buckets"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
        </Modal>
      </div>
    );
  }
}

FilterInput.propTypes = {
  onFilter: PropTypes.func,
  onAdd: PropTypes.func
};

FilterInput.defaultProps = {
  onFilter: null,
  onAdd: null
};

export default FilterInput;

