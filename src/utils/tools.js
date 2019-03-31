/**
 * 安全转换base64
 * @param {*} v 字符串
 * @return {*} 安全base64字符串
 */
export const urlSafeBase64Encode = v => {
  return Buffer.from(v).toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
}

/**
 * 资源大小计算
 * @param {*} size 资源大小
 */
export const sizeCalculation = (size = 0) => {
  const _obj = {
    size,
    unit: 'B'
  }
  if (_obj.size > 1024 * 1024 * 1024) {
    _obj.unit = 'GB'
    _obj.size = _obj.size / (1024 * 1024 * 1024)
  } else if (_obj.size > 1024 * 1024) {
    _obj.unit = 'MB'
    _obj.size = _obj.size / (1024 * 1024)
  } else if (_obj.size > 1024) {
    _obj.unit = 'KB'
    _obj.size = _obj.size / 1024
  }
  return {
    size: parseFloat(_obj.size).toFixed(2),
    unit: _obj.unit
  }
}

/**
 * 日期转换
 * @param {*} v 日期
 */
export const dateFormat = (v) => {
  if (!!v === false) {
    return '';
  } else {
    let _dt = new Date(v);
    let year = _dt.getFullYear();
    let month = _dt.getMonth() + 1;
    let day = _dt.getDate();
    let hour = _dt.getHours();
    let min = _dt.getMinutes();
    let sec = _dt.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }
}