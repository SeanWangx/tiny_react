import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Dropdown, Divider, Modal } from 'antd';
import menu from './menu';
import { sizeCalculation, dateFormat } from '../../utils/tools';
// import './index.css';

const { Column } = Table;

const fsizeConvert = fsize => {
  let fsizeObj = sizeCalculation(fsize);
  return `${fsizeObj.size} ${fsizeObj.unit}`;
};

class TableContent extends Component {
  onChangeType = ({key, type}) => {
    Modal.confirm({
      title: '提示',
      content: `是否将【${key}】转为${type === 0 ? '标准存储' : '低频存储'}?`,
      cancelText: '取消',
      okText: '确认',
      onOk: () => { this.changeFileType({key, type}); },
    });
  }
  changeFileType = ({key, type}) => {
    this.props.changeFileType({
      bucket: this.props.bucketSelected,
      key,
      type,
    }).then().catch(err => {
      console.error(err);
    });
  }
  render () {
    const { sourceList } = this.props;
    return (
      <Table dataSource={ sourceList } size="middle">
        <Column
          title="文件名"
          dataIndex="key"
          key="key" />
        <Column
          title="文件类型"
          dataIndex="mimeType"
          key="mimeType"
          width={150}/>
        <Column 
          title="存储类型"
          dataIndex="type"
          key="type"
          width={86}
          render={type => (<span>{type === 0 ? '标准存储' : '低频存储'}</span>)}
        />
        <Column
          title="文件大小"
          dataIndex="fsize"
          key="fsize"
          width={110}
          render={fsize => (<span>{ fsizeConvert(fsize) }</span>)}
        />
        <Column
          title="最近更新时间"
          dataIndex="putTime"
          key="putTime"
          width={200}
          render={putTime => (<span>{ dateFormat(putTime / 10000) }</span>)}
        />
        <Column
          title="操作"
          key="action"
          width={108}
          render={(text, record) => {
            return (
              <span>
                <a href="javascript:;">
                  {
                    this.props.domain ? (<Icon type="eye" />) : (<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="eye-invisible" />)
                  }
                </a>
                <Divider type="vertical" />
                <Dropdown
                  overlay={menu({
                    bucket: this.props.bucketSelected,
                    disabled: !this.props.domain,
                    record,
                    handlers: {
                      onChangeType: this.onChangeType,
                    }
                  })}
                  trigger={['click']}>
                  <a href="javascript:;">
                    More <Icon type="down" />
                  </a>
                </Dropdown>
              </span>
            );
          }}
        />
      </Table>
    );
  }
}

TableContent.propTypes = {
  sourceList: PropTypes.array,
  domain: PropTypes.string,
  bucketSelected: PropTypes.string,
  changeFileType: PropTypes.func.isRequired,
};

TableContent.defaultProps = {
  sourceList: [],
  domain: '',
  bucketSelected: '',
};

export default TableContent;
