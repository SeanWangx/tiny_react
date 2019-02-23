import React from 'react';
import './index.css';

const BucketItem = ({text, active, onSelect}) => {
  return (
    <div className={`bucket-item${active ? ' active' : ''}`} onClick={onSelect}>
      {text}
    </div>
  );
}

export default BucketItem;
