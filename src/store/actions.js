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