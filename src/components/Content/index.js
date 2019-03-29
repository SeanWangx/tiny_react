import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Content = ({ bucketSelected }) => {
  return (
    <div className="bucket-content">
      {
        bucketSelected === '' ? 'No buckets!' : bucketSelected
      }
    </div>
  );
}

Content.propTypes = {
  bucketSelected: PropTypes.string
};

Content.defaultProps = {
  bucketSelected: ''
};

export default Content;
