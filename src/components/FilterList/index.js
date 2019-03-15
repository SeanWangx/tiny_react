import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';
import BucketItem from '../BucketItem';
import './index.css';


const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

class FilterList extends Component {
  constructor (props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  static getDerivedStateFromProps (props, state) {
    let ret = null;
    let len = props.buckets.length;
    let index = props.match.params.index;
    if (index === undefined) {
      // /manager
      if (len > 0) {
        props.history.push('/manager/0');
        ret = { activeIndex: 0 };
      }
    } else {
      // /manager/:index
      index = parseInt(index);
      if (index < len) {
        ret = { activeIndex: index };
      } else {
        props.history.push('/manager');
      }
    }
    return ret;
  }
  handleSelect (e, index) {
    e.preventDefault();
    this.setState({
      activeIndex: index
    });
    this.props.history.push(`/manager/${index}`);
  }
  handleDelete (e, bucket) {
    e.preventDefault();
    e.stopPropagation();
    console.todo(bucket);
    this.props.deleteBucket(bucket).then(res => {
      openNotification('success', 'Create new bucket Successfully!');
      return this.props.fetchBuckets();
    }).then(() => {
      console.todo(this.props);
    }).catch(err => {
      console.error(err);
    })
  }
  render () {
    const { buckets, filterText } = this.props;
    return (
      <div className="bucket-list">
        {
          buckets.map((item, index) => {
            return (
              <BucketItem
                show={item['name'].indexOf(filterText) !== -1}
                active={index === this.state.activeIndex}
                text={item['name']}
                key={index}
                onSelect={e => this.handleSelect(e, index)}
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
  buckets: []
};

export default withRouter(FilterList);
