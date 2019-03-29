import React from 'react';
import PropTypes from 'prop-types';
import NoBucket from '../../containers/NoBucket';

import './index.css';

const Content = ({ bucketSelected }) => (
  <div className="bucket-content">
    {
      bucketSelected === '' ? <NoBucket /> : bucketSelected
    }
  </div>
);

Content.propTypes = {
  bucketSelected: PropTypes.string
};

Content.defaultProps = {
  bucketSelected: ''
};

export default Content;
