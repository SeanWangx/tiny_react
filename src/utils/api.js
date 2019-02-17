import Crypto from 'crypto';
import storage from './storage';
import { urlSafeBase64Encode } from './tools';

class API {
  constructor () {
    let accessKey = storage.get('accessKey', '');
    let secretKey = storage.get('secretKey', '');
    this.init(accessKey, secretKey);
  }

  init (accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    storage.set('accessKey', this.accessKey);
    storage.set('secretKey', this.secretKey);
  }

  clear () {
    this.accessKey = '';
    this.secretKey = '';
    storage.clear();
  }

  getAccessToken (url) {
    url = url + '\n';
    let sign = Crypto.createHmac('sha1', this.secretKey).update(url).digest();
    let encodedSign = urlSafeBase64Encode(sign);
    let accessToken = `${this.accessKey}:${encodedSign}`;
    return accessToken;
  }
}

let unique;

function getInstance () {
  if (unique === undefined) {
    unique = new API();
  }
  return unique;
}

export default getInstance();