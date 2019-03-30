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

const getSelectedIndex = (bucketList, name) => bucketList.reduce((prev, cur, index) => cur['name'] === name ? index : prev, -1);

const Title = <div style={{textAlign: 'center'}}>删除存储空间</div>

class FilterList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      waitToBeDeleted: '',
      confirmLoading: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.selectBucketIntegrated = this.selectBucketIntegrated.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  handleSelect (e, bucketObj) {
    e.preventDefault();
    if (bucketObj['name'] === this.props.bucketSelected) {
      return;
    }
    this.selectBucketIntegrated(bucketObj);
  }
  selectBucketIntegrated (bucketObj = { name: '' }) {
    // 集成处理选中操作
    if (bucketObj['name'] === this.props.bucketSelected) return;
    this.props.selectBucket(bucketObj['name']).catch(err => {
      console.error('select bucket', err);
    });
    let zone = bucketObj['zone'] || '';
    let domains = bucketObj['domains'] || [];
    if (zone === '') {
      this.props.fetchBucketZone(bucketObj['name']).catch(err => {
        console.error('fetch bucket zone', err);
      });
    }
    if (domains.length === 0) {
      this.props.fetchBucketDomains(bucketObj['name']).catch(err => {
        console.error('fetch bucket domains', err);
      });
    }
  }
  handleDelete (e, bucketObj = {}) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      visible: true,
      waitToBeDeleted: bucketObj['name']
    });
  }
  closeModal (e) {
    if (e) e.preventDefault();
    this.setState({
      visible: false,
      waitToBeDeleted: '',
      confirmLoading: false
    });
  }
  handleOk (e) {
    e.preventDefault();
    this.setState({ confirmLoading: true });

    let { waitToBeDeleted } = this.state;
    let { bucketSelected, bucketList, deleteBucket, fetchBucketList } = this.props;
    deleteBucket(waitToBeDeleted).then(res => {
      this.closeModal();
      openNotification('success', `Delete ${waitToBeDeleted} successfully!`);
    }).catch(err => {
      this.closeModal();
      openNotification('error', `Delete ${waitToBeDeleted} failed!`);
      console.error(err);
    }).then(() => {
      fetchBucketList().then(() => {
        if (waitToBeDeleted === bucketSelected) {
          this.selectBucketIntegrated(bucketList.length === 0 ? null : bucketList[0]);
        }
      }).catch(err => {
        openNotification('error', `Fetch bucketList failed!`);
        console.error(err);
      });
    })
  }
  componentDidMount () {
    const { bucketSelected, bucketList} = this.props;
    if (bucketSelected === '') {
      if (bucketList.length !== 0) {
        this.selectBucketIntegrated(bucketList[0]);
      }
    } else {
      if (bucketList.length === 0 || getSelectedIndex(bucketList, bucketSelected) === -1) {
        this.selectBucketIntegrated();
      }
    }
  }
  render () {
    const { bucketList, filterText, bucketSelected } = this.props;
    return (
      <div className="bucket-list">
        {
          bucketList.map((item, index) => {
            return (
              <BucketItem
                show={item['name'].indexOf(filterText) !== -1}
                active={item['name'] === bucketSelected}
                text={item['name']}
                key={index}
                onSelect={e => this.handleSelect(e, item)}
                onDelete={e => this.handleDelete(e, item)}/>
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
          onCancel={this.closeModal}
          confirmLoading={this.state.confirmLoading}
          cancelButtonProps={{ disabled: this.state.confirmLoading }}>
          是否确认删除存储空间：{this.state.waitToBeDeleted}?
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
  fetchBucketList: PropTypes.func.isRequired,
  deleteBucket: PropTypes.func.isRequired,
  fetchBucketZone: PropTypes.func.isRequired,
  fetchBucketDomains: PropTypes.func.isRequired,
  selectBucket: PropTypes.func.isRequired,
};

FilterList.defaultProps = {
  filterText: ''
};

export default FilterList;
