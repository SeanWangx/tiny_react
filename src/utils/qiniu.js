import Crypto from 'crypto';
import storage from './storage';
import { urlSafeBase64Encode } from './tools';

class QiNiu {
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

  getMac () {
    return {
      accessKey: this.accessKey,
      secretKey: this.secretKey
    };
  }

  getAccessToken (url) {
    if (!!this.secretKey && !!this.accessKey) {
      url = url + '\n';
      let sign = Crypto.createHmac('sha1', this.secretKey).update(url).digest();
      let encodedSign = urlSafeBase64Encode(sign);
      let accessToken = `${this.accessKey}:${encodedSign}`;
      return accessToken;
    } else {
      return null;
    }
  }
}

let unique;

function getInstance () {
  if (unique === undefined) {
    unique = new QiNiu();
  }
  return unique;
}

export default getInstance();