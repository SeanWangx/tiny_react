import React from 'react';
import { Menu } from 'antd';

const menu = ({
  bucket,
  record = {},
  disabled = false,
  handlers = {}
}) => {
  const handleClick = (e) => {
    switch (e['key']) {
      case '1':
        console.todo('下载文件');
        break;
      case '2':
        console.todo('复制外链');
        break;
      case '3':
        console.todo('移动文件');
        break;
      case '4':
        console.todo('删除文件');
        break;
      case '5':
        handlers['onChangeType']({
          key: record['key'],
          type: 1 - record['type'],
        });
        break;
      default:
        console.error('Error option!');
        break;
    }
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
