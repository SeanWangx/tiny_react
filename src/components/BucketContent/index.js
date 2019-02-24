import React from 'react';
import { withRouter } from 'react-router-dom';

import './index.css';

const BucketContent = ({match}) => {
  let index = match.params.index;
  return (
    <div className="bucket-content">
      {
        index === undefined ? 'No buckets!' : index
      }
    </div>
  );
}

export default withRouter(BucketContent);
