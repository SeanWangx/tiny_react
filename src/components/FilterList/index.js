import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, notification } from 'antd';
import BucketItem from '../BucketItem';

import './index.css';

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

const Title = <div style={{textAlign: 'center'}}>删除存储空间</div>;

class FilterList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      toBeDeleted: '',
    };
  }
  onSelectBucket = (bucket) => {
    // avoid dup select
    if (bucket === this.props.bucketSelected) return;
    this.props.selectBucket(bucket);
  }
  onDeleteBucket = (bucket) => {
    this.setState({
      visible: true,
      loading: false,
      toBeDeleted: bucket,
    });
  }
  closeModal = () => {
    this.setState({
      visible: false,
      loading: false,
      toBeDeleted: '',
    });
  }
  onOk = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.deleteBucket(this.state.toBeDeleted).then(() => {
      openNotification('success', `Delete ${this.state.toBeDeleted} successfully!`);
      this.refreshBucketList();
    }).catch(err => {
      openNotification('error', `Delete ${this.state.toBeDeleted} failed!`);
      console.error('Delete bucket failed!');
    }).then(() => {
      this.closeModal();
    });
  }
  onCancel = e => {
    e.preventDefault();
    this.closeModal();
  }
  refreshBucketList = () => {
    // container fetch bucket list and set active bucket
    this.props.fetchBucketList().then(() => {
      let isExit = this.props.bucketList.reduce((prev, cur) => {
        return prev === true ? prev : (cur['name'] === this.props.bucketSelected);
      }, false);
      if (isExit === true) {
        this.props.selectBucket(this.props.bucketSelected);
      } else {
        if (this.props.bucketList.length > 0) {
          this.props.selectBucket(this.props.bucketList[0].name);
        } else {
          this.props.selectBucket();
        }
      }
    }).catch(err => {
      console.error(err);
    });
  }
  componentDidMount () {
    this.refreshBucketList();
  }
  render () {
    return (
      <div className="bucket-list">
        {
          this.props.bucketList.map((bucket, index) => {
            return bucket['name'].indexOf(this.props.filterText) !== -1 ? (
              <BucketItem
                  active={bucket['name'] === this.props.bucketSelected}
                  text={bucket['name']}
                  key={index}
                  onSelect={this.onSelectBucket}
                  onDelete={this.onDeleteBucket}/>
            ) : null;
          })
        }
        <Modal
          title={Title}
          closable={false}
          maskClosable={false}
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          confirmLoading={this.state.loading}
          cancelButtonProps={{ disabled: this.state.loading }}>
          是否确认删除存储空间：{this.state.toBeDeleted}?
        </Modal>
      </div>
    );
  }
}

FilterList.propTypes = {
  filterText: PropTypes.string,
  bucketList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      zone: PropTypes.string,
      domains: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  bucketSelected: PropTypes.string.isRequired,
  selectBucket: PropTypes.func.isRequired,
  deleteBucket: PropTypes.func.isRequired,
};

FilterList.defaultProps = {
  filterText: '',
};

export default FilterList;
