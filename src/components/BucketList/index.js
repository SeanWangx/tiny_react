import React from 'react';
import BucketItem from '../BucketItem';
import './index.css';

const BucketList = ({buckets}) => {
  return (
    <div className="bucket-list">
      {
        buckets.map((item, index) => {
          return (
            <BucketItem key={index} text={item['name']} />
          );
        })
      }
    </div>
  );
}

export default BucketList;
