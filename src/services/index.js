import qiniu from '../utils/qiniu';
import { urlSafeBase64Encode } from '../utils/tools';
import axios from 'axios';

export function login ({ accessKey = '', secretKey = '' }) {
  // set mac
  qiniu.init(accessKey, secretKey);
  // fetch bucket list
  return fetchBucketList();
}
export function fetchBucketList () {
  let accessToken = qiniu.getAccessToken('/buckets');
  if (accessToken === null) return Promise.reject('Mac missing!');
  return axios.get('http://rs.qbox.me/buckets', {
    method: 'get',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  });
}
/**
 * 创建存储空间
 * @param {*} name 存储空间名称
 * @param {*} region 存储空间所属区域  
 */
export function createBucket ({ name, region }) {
  let encodedBucketName = urlSafeBase64Encode(name);
  let accessToken = qiniu.getAccessToken(`/mkbucketv2/${encodedBucketName}/region/${region}`);
  if (accessToken === null) return Promise.reject('Mac missing!');
  return axios.post(`http://rs.qiniu.com/mkbucketv2/${encodedBucketName}/region/${region}`, null, {
    method: 'post',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  });
}
/**
 * 删除存储空间
 * @param {*} bucket 存储空间名称
 */
export function deleteBucket (bucket) {
  let accessToken = qiniu.getAccessToken(`/drop/${bucket}`);
  if (accessToken === null) return Promise.reject('Mac missing!');
  return axios.post(`http://rs.qiniu.com/drop/${bucket}`, null, {
    method: 'post',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  });
}
/**
 * 获取存储空间所属区域
 * @param {*} bucket 存储空间名称
 */
export function fetchBucketZone (bucket) {
  const { accessKey } = qiniu.getMac();
  let uri = `/v2/query?ak=${accessKey}&bucket=${bucket}`;
  let accessToken = qiniu.getAccessToken(uri);
  if (accessToken === null) return Promise.reject('Mac key missing!');
  return axios.get(`http://uc.qbox.me${uri}`, {
    methods: 'get',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  }).then(res => {
    let uploadURL = res['data']['up']['src']['main'][0];
    let zone = '';
    if (uploadURL.indexOf('up-as0') !== -1) {
      zone = 'as0';
    } else if (uploadURL.indexOf('up-na0') !== -1) {
      zone = 'na0';
    } else if (uploadURL.indexOf('up-z2') !== -1) {
      zone = 'z2';
    } else if (uploadURL.indexOf('up-z1') !== -1) {
      zone = 'z1';
    } else {
      zone = 'z0';
    }
    return Promise.resolve(zone);
  });
}
/**
 * 获取存储空间域名
 * @param {*} bucket 存储空间名称
 */
export function fetchBucketDomains (bucket) {
  let uri = `/v6/domain/list?tbl=${bucket}`;
  let accessToken = qiniu.getAccessToken(uri);
  if (accessToken === null) return Promise.reject('Mac key missing!');
  return axios.get(`http://api.qiniu.com${uri}`, {
    method: 'get',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  }).then(res => {
    return Promise.resolve(res['data']);
  });
}
