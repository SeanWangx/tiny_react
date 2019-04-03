import React from 'react';
import { Menu } from 'antd';

const menu = ({bucket, record, disabled = false, handlers }) => (
  <Menu>
    <Menu.Item disabled={disabled} onClick={null}>下载文件</Menu.Item>
    <Menu.Item disabled={disabled} onClick={null}>复制外链</Menu.Item>
    <Menu.Item onClick={null}>移动文件</Menu.Item>
    <Menu.Item onClick={null}>删除文件</Menu.Item>
    <Menu.Item onClick={handlers['onChangeType']}>转换存储类型</Menu.Item>
  </Menu>
);

export default menu;
