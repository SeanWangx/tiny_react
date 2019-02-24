import React from 'react';
import './index.css';

const BucketItem = ({
  text,
  active,
  show = true,
  onSelect
}) => {
  return show === true ? (
    <div className={`bucket-item${active ? ' active' : ''}`} onClick={onSelect}>
      {text}
    </div>
  ) : null;
}

export default BucketItem;
