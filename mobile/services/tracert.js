const HOST_URL = 'https://api.borobudur.rijalasepnugroho.com';

export default class {
  constructor(deps) {
    this.proto = deps.proto;
    this.client = new deps.proto.TracertClient(HOST_URL, null, null);
  }
}
