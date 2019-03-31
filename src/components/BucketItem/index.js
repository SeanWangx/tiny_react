import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './index.css';

class BucketItem extends Component {
  onClickSelect = (e) => {
    e.preventDefault();
    this.props.onSelect && this.props.onSelect(this.props.text);
  }
  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete && this.props.onDelete(this.props.text);
  }
  render () {
    const { active, text } = this.props;
    return (
      <div className={`bucket-item${active ? ' active' : ''}`} onClick={this.onClickSelect}>
        <div className="item-text" title={text}>{text}</div>
        <div className="delete-btn">
          <Icon type="close-circle" onClick={this.onClickDelete}/>
        </div>
      </div>
    );
  }
}

BucketItem.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

BucketItem.defaultProps = {
  text: '',
  active: false,
  onSelect: null,
  onDelete: null,
};

export default BucketItem;
