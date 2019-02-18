import {
  ADD_MAC,
  DELETE_MAC
} from './actions';
import storage from '@/utils/storage';

const initialState = {
  accessKey: storage.get('accessKey', ''),
  secretKey: storage.get('secretKey', ''),
  isAuth: storage.get('isAuth', false),
  buckets: storage.get('buckets', [])
};

export default function tinyApp (state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_MAC:
      newState = {
        accessKey: action.payload['accessKey'] || '',
        secretKey: action.payload['secretKey'] || '',
        isAuth: true
      }
      Object.keys(newState).forEach(key => storage.set(key, newState[key]))
      return {
        ...state,
        ...newState
      };
    case DELETE_MAC:
      newState = {
        accessKey: '',
        secretKey: '',
        isAuth: false
      }
      Object.keys(newState).forEach(key => storage.set(key, newState[key]))
      return {
        ...state,
        ...newState
      };
    default:
      return state;
  }
};
