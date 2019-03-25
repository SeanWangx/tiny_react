import React from 'react';

import './index.css';

const Content = ({ selected = '' }) => {
  return (
    <div className="bucket-content">
      {
        selected === '' ? 'No buckets!' : selected
      }
    </div>
  );
}

export default Content;
