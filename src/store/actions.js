import {
  login as loginAPI,
  fetchBucketList as fetchBucketListAPI,
  createBucket as createBucketAPI,
  deleteBucket as deleteBucketAPI,
  fetchBucketZone as fetchBucketZoneAPI,
  fetchBucketDomains as fetchBucketDomainsAPI,
  fetchBucketSource as fetchBucketSourceAPI,
  changeFileType as changeFileTypeAPI,
  deleteFile as deleteFileAPI,
} from '../services';

/**
 * action types
 */
export const SET_MAC = 'SET_MAC';
export const SET_AUTH = 'SET_AUTH';

export const REFRESH_BUCKET_LIST = 'REFRESH_BUCKET_LIST';
export const ADD_BUCKET = 'ADD_BUCKET';
export const REMOVE_BUCKET = 'REMOVE_BUCKET';
export const MODIFY_BUCKET_ZONE = 'MODIFY_BUCKET_ZONE';
export const MODIFY_BUCKET_DOMAINS = 'MODIFY_BUCKET_DOMAINS';

export const SET_BUCKET_SELECTED = 'SET_BUCKET_SELECTED';
export const SET_BUCKET_SOURCE = 'SET_BUCKET_SOURCE';

/**
 * sync action creators
 */
export function setMac ({ accessKey = '', secretKey = '' }) {
  return {
    type: SET_MAC,
    payload: { accessKey, secretKey }
  };
}
export function setAuth (isAuth = false) {
  return {
    type: SET_AUTH,
    isAuth
  };
}
export function refreshBucketList (bucketList = []) {
  return {
    type: REFRESH_BUCKET_LIST,
    bucketList
  };
}
export function addBucket ({ name, zone = '', domains = [] }) {
  return {
    type: ADD_BUCKET,
    payload: { name, zone, domains }
  };
}
export function removeBucket (name) {
  return {
    type: REMOVE_BUCKET,
    name
  };
}
export function modifyBucketZone ({ name, zone = '' }) {
  return {
    type: MODIFY_BUCKET_ZONE,
    payload: { name, zone }
  };
}
export function modifyBucketDomains ({ name, domains = []}) {
  return {
    type: MODIFY_BUCKET_DOMAINS,
    payload: { name, domains }
  };
}
export function setBucketSelected (name = '') {
  return {
    type: SET_BUCKET_SELECTED,
    name
  };
}
export function setBucketSource ({ sourceList = [], sourceCount = 0 }) {
  return {
    type: SET_BUCKET_SOURCE,
    payload: { sourceCount, sourceList }
  };
}

/**
 * async action creators
 */
export function login ({ accessKey = '', secretKey = ''}) {
  return dispatch => {
    return loginAPI({ accessKey, secretKey }).then(res => {
      const { data } = res;
      dispatch(refreshBucketList(data.map(name => ({
        name,
        zone: '',
        domains: []
      }))));
      // set base config: mac and auth
      dispatch(setMac({ accessKey, secretKey }));
      dispatch(setAuth(true));
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  };
}
export function logout () {
  return dispatch => {
    dispatch(setMac({}));
    dispatch(setAuth());
    dispatch(refreshBucketList());
    dispatch(setBucketSelected());
  };
}
export function fetchBucketList () {
  return dispatch => {
    return fetchBucketListAPI().then(res => {
      const { data } = res;
      dispatch(refreshBucketList(data.map(name => ({
        name,
        zone: '',
        domains: []
      }))));
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  };
}
export function createBucket ({ name, region }) {
  return dispatch => {
    return createBucketAPI({ name, region });
  };
}
export function deleteBucket (bucket) {
  return dispatch => {
    return deleteBucketAPI(bucket);
  };
}
export function fetchBucketZone (name) {
  return dispatch => {
    return fetchBucketZoneAPI(name).then(zone => {
      dispatch(modifyBucketZone({ name, zone }));
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  };
}
export function fetchBucketDomains (name) {
  return dispatch => {
    return fetchBucketDomainsAPI(name).then(domains => {
      dispatch(modifyBucketDomains({ name, domains }));
      return Promise.resolve(domains);
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  }
}
export function selectBucket (name = '') {
  return (dispatch, getState) => {
    dispatch(setBucketSelected(name));
    if (name === '') {
      dispatch(setBucketSource({}));
    } else {
      const { bucketList } = getState();
      const { zone = '', domains = [] } = bucketList.reduce((prev, cur) => {
        if (prev === null && cur['name'] === name) {
          return cur;
        } else {
          return prev;
        }
      }, null);
      if (zone === '') dispatch(fetchBucketZone(name));
      if (domains.length === 0) dispatch(fetchBucketDomains(name));
      dispatch(fetchBucketSource({ bucket: name }));
    }
  }
}
export function fetchBucketSource ({
  bucket,
  marker = '',
  limit = '10000',
  prefix = '',
  delimiter = '',
}) {
  return dispatch => {
    return fetchBucketSourceAPI({
      bucket,
      marker,
      limit,
      prefix,
      delimiter
    }).then(sourceList => {
      dispatch(setBucketSource({
        sourceList,
        sourceCount: sourceList.length
      }));
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  };
}
export function changeFileType({
  bucket, // 存储空间名称
  key, // 资源名称
  type, // 指定资源存储类型
}) {
  return dispatch => {
    return changeFileTypeAPI({bucket, key, type});
  }
}
export function deleteFile({
  bucket,
  key,
}) {
  return dispatch => {
    return deleteFileAPI({ bucket, key });
  }
}