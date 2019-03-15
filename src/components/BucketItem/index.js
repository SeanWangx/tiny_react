import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './index.css';

const BucketItem = ({
  text,
  active,
  show,
  onSelect
}) => {
  return show === true ? (
    <div className={`bucket-item${active ? ' active' : ''}`} onClick={onSelect}>
      <div className="item-text">{text}</div>
      <div className="delete-btn">
        <Icon type="close-circle" />
      </div>
    </div>
  ) : null;
}

BucketItem.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  show: PropTypes.bool,
  onSelect: PropTypes.func
};

BucketItem.defaultProps = {
  text: '',
  active: false,
  show: true,
  onSelect: null
};

export default BucketItem;
