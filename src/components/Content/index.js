import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Content = ({ selected }) => {
  return (
    <div className="bucket-content">
      {
        selected === '' ? 'No buckets!' : selected
      }
    </div>
  );
}

Content.propTypes = {
  selected: PropTypes.string
};

Content.defaultProps = {
  selected: ''
};

export default Content;
