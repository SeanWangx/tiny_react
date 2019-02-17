import {
  ADD_MAC,
  DELETE_MAC
} from './actions';
import storage from '@/utils/storage';

const initialState = {
  accessKey: storage.get('accessKey', ''),
  secretKey: storage.get('secretKey', ''),
  isAuthenticated: storage.get('isAuthenticated', false),
  buckets: storage.get('buckets', [])
};

export default function tinyApp (state = initialState, action) {
  switch (action.type) {
    case ADD_MAC:
      return {
        ...state,
        accessKey: action.payload['accessKey'] || '',
        secretKey: action.payload['secretKey'] || ''
      };
    case DELETE_MAC:
      return {
        ...state,
        accessKey: '',
        secretKey: ''
      };
    default:
      return state;
  }
};
