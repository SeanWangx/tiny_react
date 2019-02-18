import qiniu from '../utils/qiniu';
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