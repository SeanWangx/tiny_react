import React, { Component } from 'react';
import { Icon } from 'antd';
import FilterInput from '../FilterInput';
import FilterList from '../../containers/FilterList';
import './index.css';

class BucketSider extends Component {
  constructor (props) {
    super(props);
    this.state = { filterText: '' };
    this.hanldeFilter = this.handleFilter.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleFilter (e) {
    e.preventDefault(e);
    this.setState({
      filterText: e.target.value
    });
  }
  handleAdd (e) {
    e.preventDefault();
    console.log('[TODO]add bucket');
  }
  render () {
    return (
      <div className="bucket-sider">
        <div className="bucket-sider-item item-filter">
          <FilterInput onFilter={this.hanldeFilter} onAdd={this.handleAdd}/>
        </div>
        <div className="bucket-sider-item item-list" onClick={() => this.props.onViewChange('content')}>
          <FilterList filterText={this.state.filterText}/>
        </div>
        <div className="bucket-sider-item item-setting">
          <Icon type="setting" style={{'cursor': 'pointer'}} onClick={() => this.props.onViewChange('setting')}/>
        </div>
      </div>
    );
  }
}

export default BucketSider;
