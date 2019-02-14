import storage from './storage';

class API {
  constructor () {
    let accessKey = storage.get('accessKey');
    let secretKey = storage.get('secretKey');
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  init (accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    storage.set('accessKey', this.accessKey);
    storage.set('secretKey', this.secretKey);
  }

  clear () {
    this.accessKey = undefined;
    this.secretKey = undefined;
    storage.clear();
  }
  
  getMac () {
    return {
      accessKey: this.accessKey,
      secretKey: this.secretKey
    };
  }
  show () {
    console.log(this.getMac());
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