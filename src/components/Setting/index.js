import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import './index.css';

const BucketSetting = ({ onBack, logout, accessKey }) => (
  <div className="manager-setting">
    <div className="to-back">
      <Button icon="arrow-left" onClick={onBack}/>
    </div>
    <div className="manager-mac">
      <h3>密钥管理</h3>
      <div className="mac-item">
        <div className="mac-item-label">AccessKey:</div>
        <div className="mac-item-content">
          <Input disabled value={accessKey} />
        </div>
      </div>
      <div className="mac-item">
        <div className="mac-item-label">SecretKey:</div>
        <div className="mac-item-content">
          <Input disabled value={accessKey.replace(/.+?/g, '*')} type="password"/>
        </div>
      </div>
      <div className="mac-item">
        <Button type="danger" onClick={logout}>Logout</Button>
      </div>
    </div>
  </div>
)

BucketSetting.propTypes = {
  accessKey: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  logout: PropTypes.func.isRequired
};

BucketSetting.defaultProps = {
  onBack: null
};

export default BucketSetting;
