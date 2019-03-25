import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification, Modal } from 'antd';
import BucketItem from '../BucketItem';
import './index.css';

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

const getSelectedIndex = (buckets, selected) => buckets.reduce((prev, cur, index) => cur['name'] === selected ? index : prev, -1);

const Title = <div style={{textAlign: 'center'}}>删除存储空间</div>

class FilterList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: -1,
      visible: false,
      waitToBeDeleted: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  handleSelect (e, bucket) {
    e.preventDefault();
    this.props.selectBucket(bucket);
  }
  handleDelete (e, bucket) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      visible: true,
      waitToBeDeleted: bucket
    });
  }
  closeModal (e) {
    if (e) e.preventDefault();
    this.setState({
      visible: false,
      waitToBeDeleted: ''
    });
  }
  handleOk (e) {
    e.preventDefault();
    console.todo('handleOk to delete', this.state.waitToBeDeleted);
    this.closeModal();
    /* this.props.deleteBucket(bucket).then(res => {
      openNotification('success', 'Create new bucket Successfully!');
      return this.props.fetchBuckets();
    }).then(() => {
      console.todo(this.props);
    }).catch(err => {
      console.error(err);
    }) */
  }
  render () {
    const { buckets, filterText, selected } = this.props;
    return (
      <div className="bucket-list">
        {
          buckets.map((item, index) => {
            return (
              <BucketItem
                show={item['name'].indexOf(filterText) !== -1}
                active={item['name'] === selected}
                text={item['name']}
                key={index}
                onSelect={e => this.handleSelect(e, item['name'])}
                onDelete={e => this.handleDelete(e, item['name'])}/>
            );
          })
        }
        <Modal
          title={Title}
          closable={false}
          maskClosable={false}
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.closeModal}>
          是否确认删除存储空间：{this.state.waitToBeDeleted}?
        </Modal>
      </div>
    );
  }
}

FilterList.propTypes = {
  filterText: PropTypes.string,
  selected: PropTypes.string,
  buckets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      zone: PropTypes.string,
      domains: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  fetchBuckets: PropTypes.func.isRequired,
  deleteBucket: PropTypes.func.isRequired,
  selectBucket: PropTypes.func.isRequired
};

FilterList.defaultProps = {
  filterText: '',
  selected: '',
  buckets: []
};

export default FilterList;
