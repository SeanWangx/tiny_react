/**
 * action types
 */
export const ADD_MAC = 'ADD_MAC';
export const DELETE_MAC = 'DELETE_MAC';

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
