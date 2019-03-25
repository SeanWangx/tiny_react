import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import BucketItem from '../BucketItem';
import './index.css';

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

const getSelectedIndex = (buckets, selected) => buckets.reduce((prev, cur, index) => cur['name'] === selected ? index : prev, -1);

class FilterList extends Component {
  constructor (props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleSelect (e, bucket) {
    e.preventDefault();
    e.stopPropagation();
    console.todo('handleSelect', bucket);
    /* this.setState({
      activeIndex: index
    }); */
  }
  handleDelete (e, bucket) {
    e.preventDefault();
    e.stopPropagation();
    console.todo('handleDelete', bucket);
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
  deleteBucket: PropTypes.func.isRequired
};

FilterList.defaultProps = {
  filterText: '',
  selected: '',
  buckets: []
};

export default FilterList;
