import {
  fetchBuckets as fetchBucketsAPI,
  createBucket as createBucketAPI
} from '../services';
/**
 * action types
 */
export const ADD_MAC = 'ADD_MAC';
export const DELETE_MAC = 'DELETE_MAC';
export const REFRESH_BUCKETS = 'REFRESH_BUCKETS';
export const MODIFY_BUCKET = 'MODIFY_BUCKET';

/**
 * action creators
 */
 export function addMac (payload) {
  return {
    type: ADD_MAC,
    payload // {accessKey, secretKey}
  };
}

export function deleteMac () {
  return {
    type: DELETE_MAC
  };
}

export function refreshBuckets (buckets) {
  return {
    type: REFRESH_BUCKETS,
    buckets // [{name:string, zone:string, domains:array}]
  };
}

export function modifyBucket (payload) {
  const { index, bucket } = payload
  return {
    type: MODIFY_BUCKET,
    index,
    bucket // {name:string, zone:string, domains:array}
  };
}

// async fetch buckets
export function fetchBuckets () {
  return dispatch => {
    return fetchBucketsAPI().then(res => {
      const { data } = res;
      dispatch(refreshBuckets(data.map(item => ({
        name: item,
        zone: '',
        domains: []
      }))));
      return Promise.resolve(res);
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    })
  }
}

// async create buckets
export function createBucket ({ bucket, region }) {
  return dispatch => {
    return createBucketAPI({ bucket, region });
  }
}