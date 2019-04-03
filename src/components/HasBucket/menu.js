import React from 'react';
import { Menu } from 'antd';

const menu = (bucket, source) => (
  <Menu>
    <Menu.Item onClick={() => console.log(`移动文件 ${bucket}:${source}`)}>移动文件</Menu.Item>
    <Menu.Item onClick={() => console.log('删除文件')}>删除文件</Menu.Item>
    <Menu.Item onClick={() => console.log('转换存储类型')}>转换存储类型</Menu.Item>
  </Menu>
);

export default menu;
