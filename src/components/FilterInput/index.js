import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';

import './index.css';

const inputStyle = {
  'backgroundColor': '#545c64',
  'color': '#fff'
};
const btnStyle = {
  'padding': '4px',
  'cursor': 'pointer'
};

const FilterInput = ({ onFilter, onAdd }) => (
  <div className="filter-container">
    <div className="bucket-filter">
      <Input size="small" placeholder="Search" style={inputStyle} onChange={onFilter}/>
    </div>
    <div className="bucket-add">
      <Icon type="plus-square" style={btnStyle} onClick={onAdd} />
    </div>
  </div>
)

FilterInput.propTypes = {
  onFilter: PropTypes.func,
  onAdd: PropTypes.func
};

FilterInput.defaultProps = {
  onFilter: null,
  onAdd: null
};

export default FilterInput;

