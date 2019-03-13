import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import FilterInput from '../FilterInput';
import FilterList from '../../containers/FilterList';
import './index.css';

class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: '',
      visible: false
    };
    this.hanldeFilter = this.handleFilter.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleFilter (e) {
    e.preventDefault(e);
    this.setState({
      filterText: e.target.value
    });
  }
  toggleVisible (visible = false) {
    this.setState({ visible });
  }
  showModal (e) {
    e.preventDefault();
    this.toggleVisible(true);
  }
  handleOk (e) {
    e.preventDefault();
    this.toggleVisible(false);
    console.todo('handle ok');
  }
  handleCancel (e) {
    e.preventDefault();
    this.toggleVisible(false);
    console.todo('handle cancel');
  }
  handleAdd (e) {
    e.preventDefault();
    console.todo('add bucket');
  }

  render () {
    return (
      <div className="sider-content">
        <div className="sider-item item-filter">
          <FilterInput onFilter={this.hanldeFilter} onAdd={this.showModal}/>
          <Modal
            title="create bucket"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
          </Modal>
        </div>
        <div className="sider-item item-list" onClick={() => this.props.onViewChange('content')}>
          <FilterList filterText={this.state.filterText}/>
        </div>
        <div className="sider-item item-setting">
          <Icon type="setting" style={{'cursor': 'pointer'}} onClick={() => this.props.onViewChange('setting')}/>
        </div>
      </div>
    );
  }
}

export default Sider;
