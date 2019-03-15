import qiniu from '../utils/qiniu';
import { urlSafeBase64Encode } from '../utils/tools';
import axios from 'axios';

export function fetchBuckets () {
  let accessToken = qiniu.getAccessToken('/buckets');
  return axios.get('http://rs.qbox.me/buckets', {
    method: 'get',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  });
}

export function createBucket ({ bucket, region }) {
  let encodedBucketName = urlSafeBase64Encode(bucket);
  let accessToken = qiniu.getAccessToken(`/mkbucketv2/${encodedBucketName}/region/${region}`);
  return axios.post(`http://rs.qiniu.com/mkbucketv2/${encodedBucketName}/region/${region}`, null, {
    method: 'post',
    headers: {
      'Authorization': `QBox ${accessToken}`
    }
  });
}
