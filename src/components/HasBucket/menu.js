import React from 'react';
import { Menu } from 'antd';

const menu = (bucket, source, validate = true) => (
  <Menu>
    <Menu.Item disabled={!validate} onClick={() => console.log(`下载文件 ${bucket}:${source}`)}>下载文件</Menu.Item>
    <Menu.Item disabled={!validate} onClick={() => console.log(`复制外链 ${bucket}:${source}`)}>复制外链</Menu.Item>
    <Menu.Item onClick={() => console.log(`移动文件 ${bucket}:${source}`)}>移动文件</Menu.Item>
    <Menu.Item onClick={() => console.log(`删除文件 ${bucket}:${source}`)}>删除文件</Menu.Item>
    <Menu.Item onClick={() => console.log(`转换存储类型 ${bucket}:${source}`)}>转换存储类型</Menu.Item>
  </Menu>
);

export default menu;
