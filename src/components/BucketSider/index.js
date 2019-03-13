import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import FilterInput from '../FilterInput';
import FilterList from '../../containers/FilterList';
import './index.css';

class BucketSider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: '',
      visible: false
    };
    this.hanldeFilter = this.handleFilter.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleFilter (e) {
    e.preventDefault(e);
    this.setState({
      filterText: e.target.value
    });
  }
  showModal (e) {
    e.preventDefault();
    this.setState({ visible: true});
  }
  handleOk (e) {
    e.preventDefault();
    this.setState({ visible: false });
    console.log('[TODO]ok');
  }
  handleCancel (e) {
    e.preventDefault();
    this.setState({ visible: false });
    console.log('[TOSO]cancel');
  }
  handleAdd (e) {
    e.preventDefault();
    console.log('[TODO]add bucket');
  }
  render () {
    return (
      <div className="bucket-sider">
        <div className="bucket-sider-item item-filter">
          <FilterInput onFilter={this.hanldeFilter} onAdd={this.showModal}/>
          <Modal
            title="create bucket"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          </Modal>
        </div>
        <div className="bucket-sider-item item-list" onClick={() => this.props.onViewChange('content')}>
          <FilterList filterText={this.state.filterText}/>
        </div>
        <div className="bucket-sider-item item-setting">
          <Icon type="setting" style={{'cursor': 'pointer'}} onClick={() => this.props.onViewChange('setting')}/>
        </div>
      </div>
    );
  }
}

export default BucketSider;
