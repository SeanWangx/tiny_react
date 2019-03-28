import {
  fetchBuckets as fetchBucketsAPI,
  createBucket as createBucketAPI,
  deleteBucket as deleteBucketAPI,
  fetchBucketZone as fetchBucketZoneAPI,
  fetchBucketDomains as fetchBucketDomainsAPI
} from '../services';
/**
 * action types
 */
export const ADD_MAC = 'ADD_MAC';
export const DELETE_MAC = 'DELETE_MAC';
export const REFRESH_BUCKETS = 'REFRESH_BUCKETS';
export const MODIFY_BUCKET = 'MODIFY_BUCKET';
export const MODIFY_BUCKET_ZONE = 'MODIFY_BUCKET_ZONE';
export const MODIFY_BUCKET_DOMAINS = 'MODIFY_BUCKET_DOMAINS';
export const SELECT_BUCKET = 'SELECT_BUCKET';

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

export function modifyBucketZone ({ bucket, zone }) {
  return {
    type: MODIFY_BUCKET_ZONE,
    bucket,
    zone
  };
}

export function modifyBucketDomains ({ bucket, domains }) {
  return {
    type: MODIFY_BUCKET_DOMAINS,
    bucket,
    domains
  };
}

export function selectBucket (bucket) {
  return {
    type: SELECT_BUCKET,
    bucket
  }
}

export function refreshBuckets (buckets) {
  return {
    type: REFRESH_BUCKETS,
    buckets // [{name:string, zone:string, domains:array}]
  };
}

export function modifyBucket ({ index, bucket }) {
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

// async delete bucket
export function deleteBucket (bucket) {
  return dispathch => {
    return deleteBucketAPI(bucket);
  }
}

// async fetch bucket zone
export function fetchBucketZone (bucket) {
  return dispatch => {
    return fetchBucketZoneAPI(bucket).then(zone => {
      dispatch(modifyBucketZone({ bucket, zone }));
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  }
}

// async fetch bucket domains
export function fetchBucketDomains (bucket) {
  return dispatch => {
    return fetchBucketDomainsAPI(bucket).then(domains =>{
      dispatch(modifyBucketDomains({ bucket, domains }));
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  }
}