import React from 'react';
import { Menu } from 'antd';

const menu = ({
  bucket,
  record = {},
  disabled = false,
  handlers = {}
}) => {
  const handleClick = (e) => {
    console.todo(e);
  };
  return (
    <Menu onClick={handleClick}>
      <Menu.Item key="1" disabled={disabled}>下载文件</Menu.Item>
      <Menu.Item key="2" disabled={disabled}>复制外链</Menu.Item>
      <Menu.Item key="3">移动文件</Menu.Item>
      <Menu.Item key="4">删除文件</Menu.Item>
      <Menu.Item key="5">转换存储类型</Menu.Item>
    </Menu>
  );
}

export default menu;
