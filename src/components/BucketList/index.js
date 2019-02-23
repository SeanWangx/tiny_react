import React, { Component } from 'react';
import BucketItem from '../BucketItem';
import './index.css';

class BucketList extends Component {
  constructor (props) {
    super(props);
    this.state = { activeIndex: this.props.buckets.length > 0 ? 0 : -1 };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect (index) {
    this.setState({
      activeIndex: index
    })
  }
  componentDidMount () {
    if (this.props.buckets.length > 0) {
      this.setState({
        activeIndex: 0
      });
    }
  }
  render () {
    const { buckets } = this.props;
    return (
      <div className="bucket-list">
        {
          buckets.map((item, index) => {
            return (
              <BucketItem active={index === this.state.activeIndex} key={index} text={item['name']} onSelect={() => this.handleSelect(index)}/>
            );
          })
        }
      </div>
    );
  }
}

export default BucketList;
