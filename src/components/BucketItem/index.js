import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const BucketItem = ({
  text,
  active,
  show,
  onSelect
}) => {
  return show === true ? (
    <div className={`bucket-item${active ? ' active' : ''}`} onClick={onSelect}>
      {text}
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
