import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BucketItem from '../BucketItem';
import './index.css';

class FilterList extends Component {
  constructor (props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.handleSelect = this.handleSelect.bind(this);
  }
  static getDerivedStateFromProps (props, state) {
    let ret = null;
    let len = props.buckets.length;
    let index = props.match.params.index;
    if (index === undefined) {
      // /buckets
      if (len > 0) {
        props.history.push('/buckets/0');
        ret = { activeIndex: 0 };
      }
    } else {
      // /buckets/:index
      index = parseInt(index);
      if (index < len) {
        ret = { activeIndex: index };
      } else {
        props.history.push('/buckets');
      }
    }
    return ret;
  }
  handleSelect (e, index) {
    e.preventDefault();
    this.setState({
      activeIndex: index
    });
    this.props.history.push(`/buckets/${index}`);
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
                onSelect={e => this.handleSelect(e, index)}/>
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
  )
};

FilterList.defaultProps = {
  filterText: '',
  buckets: []
};

export default withRouter(FilterList);
