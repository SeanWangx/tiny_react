import React from 'react';

const BucketList = ({buckets}) => {
  return (
    <div className="bucket-list">
      {
        buckets.map((item, index) => {
          return (<div key={index}>{item.name}</div>)
        })
      }
    </div>
  );
}

export default BucketList;
