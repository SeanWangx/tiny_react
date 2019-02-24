import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BucketItem from '../BucketItem';
import './index.css';

class BucketList extends Component {
  constructor (props) {
    super(props);
    this.state = { activeIndex: this.props.buckets.length > 0 ? 0 : -1 };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect (e, index) {
    e.preventDefault();
    this.setState({
      activeIndex: index
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
                key={index} text={item['name']}
                onSelect={(e) => this.handleSelect(e, index)}/>
            );
          })
        }
      </div>
    );
  }
}

BucketList.propTypes = {
  filterText: PropTypes.string,
  buckets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      zone: PropTypes.string,
      domains: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

BucketList.defaultProps = {
  filterText: '',
  buckets: []
};

export default BucketList;
