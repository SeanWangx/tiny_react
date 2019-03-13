import React from 'react';
import { withRouter } from 'react-router-dom';

import './index.css';

const Content = ({match}) => {
  let index = match.params.index;
  return (
    <div className="bucket-content">
      {
        index === undefined ? 'No buckets!' : index
      }
    </div>
  );
}

export default withRouter(Content);
