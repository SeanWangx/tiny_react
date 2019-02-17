/**
 * 安全转换base64
 * @param {*} v 字符串
 * @return {*} 安全base64字符串
 */
export const urlSafeBase64Encode = v => {
  return Buffer.from(v).toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
}
