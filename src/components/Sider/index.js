import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, notification } from 'antd';
import FilterInput from '../FilterInput';
import FilterList from '../../containers/FilterList';
import CreateBucket from '../CreateBucket';

import './index.css';

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: '',
      visible: false,
      confirmLoading: false
    };
    this.hanldeFilter = this.handleFilter.bind(this);
  }
  handleFilter (e) {
    e.preventDefault(e);
    this.setState({
      filterText: e.target.value
    });
  }
  toggleVisible = (visible = false) => {
    this.setState({
      visible,
      confirmLoading: false
    });
  }
  showModal = () => {
    this.toggleVisible(true);
  }
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ confirmLoading: true });

      let { bucket, region } = values;
      this.props.createBucket({ name: bucket, region }).then(res => {
        this.toggleVisible(false);
        form.resetFields();
        openNotification('success', `Create ${bucket} successfully!`);
      }).catch(err => {
        this.toggleVisible(false);
        openNotification('error', `Create ${bucket} failed!`);
        console.error(err);
      }).then(() => {
        this.props.fetchBucketList().catch(err => {
          openNotification('error', `Fetch buckets failed!`);
          console.error(err);
        });
      })
    });
  }
  handleCancel = () => {
    const { form } = this.formRef.props;
    this.toggleVisible(false);
    form.resetFields();
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  }

  render () {
    return (
      <div className="sider-content">
        <div className="sider-item item-filter">
          <FilterInput onFilter={this.hanldeFilter} onAdd={this.showModal}/>
          <CreateBucket
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            loading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate} />
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

Sider.propTypes = {
  fetchBucketList: PropTypes.func.isRequired,
  createBucket: PropTypes.func.isRequired
};

export default Sider;
