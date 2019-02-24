import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import BucketItem from '../BucketItem';
import './index.css';

class BucketList extends Component {
  constructor (props) {
    super(props);
    super(props);
    this.state = { activeIndex: this.props.buckets.length > 0 ? 0 : -1 };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect (index) {
    this.setState({
      activeIndex: index
    })
  }

  render () {
    const { buckets, filterText, match } = this.props;
    return (
      <div className="bucket-list">
        {
          buckets.map((item, index) => {
            return (
              <Link to={`${match.path}/${index}`} key={index}>
                <BucketItem
                  show={item['name'].indexOf(filterText) !== -1}
                  active={index === this.state.activeIndex}
                  text={item['name']}
                  onSelect={() => this.handleSelect(index)}/>
              </Link>
            );
          })
        }
      </div>
    );
  }
}

BucketList.propTypes = {
  filterText: PropTypes.string,
  buckets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      zone: PropTypes.string,
      domains: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

BucketList.defaultProps = {
  filterText: '',
  buckets: []
};

export default withRouter(BucketList);
