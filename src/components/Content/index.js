import React from 'react';
import { withRouter } from 'react-router-dom';

import './index.css';

const Content = ({match}) => {
  let bucket = match.params.bucket;
  return (
    <div className="bucket-content">
      {
        bucket === undefined ? 'No buckets!' : bucket
      }
    </div>
  );
}

export default withRouter(Content);
