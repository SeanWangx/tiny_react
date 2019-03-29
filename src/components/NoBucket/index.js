import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import CreateBucket from '../CreateBucket';

import './index.css';

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

class NoBucket extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      loading: false
    };
  }
  toggleVisible = (visible = false) => {
    this.setState({
      visible,
      loading: false
    })
  }
  showModal = (e) => {
    e.preventDefault();
    this.toggleVisible(true);
  }
  handleCancel = (e) => {
    e.preventDefault();
    const { form } = this.formRef.props;
    this.toggleVisible(false);
    form.resetFields();
  }
  handleCreate = (e) => {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ loading: true });

      let { bucket, region } = values;
      this.props.createBucket({ name: bucket, region }).then(res => {
        this.toggleVisible(false);
        form.resetFields();
        openNotification('success', `Create ${bucket} successfully!`);
        return this.props.fetchBucketList().catch(err => {
          openNotification('error', `Fetch buckets failed!`);
          console.error(err);
        });
      }).catch(err => {
        this.toggleVisible(false);
        openNotification('error', `Create ${bucket} failed!`);
        console.error(err);
      });
    });
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  }
  render () {
    return (
      <div className="has-no-bucket">
        <div>
          <h1>You have no bucket!</h1>
          <p><Button type="primary" size="small" onClick={this.showModal}>Create</Button> a new bucket!</p>
          <CreateBucket
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            loading={this.state.loading}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate} />
        </div>
      </div>
    );
  }
}

NoBucket.propTypes = {
  fetchBucketList: PropTypes.func.isRequired,
  createBucket: PropTypes.func.isRequired
};

export default NoBucket;
