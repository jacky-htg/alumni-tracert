import Tracert from './tracert';
// import Cookies from 'js-cookie';

export default class extends Tracert {
  constructor(proto, Legalize) {
    super(proto);
    this.req = Legalize;
  }
  /* create() {
    const token = Cookies.get('token');
    return this.client.legalizeUpload(this.req, {token}).then(out => {
      return out;
    });
  }
  getOwn() {
    const token = Cookies.get('token');
    return this.client.legalizeGetOwn(this.req, {token}).then(out => {
      return out;
    });
  }
  rating() {
    const token = Cookies.get('token');
    return this.client.legalizeRating(this.req, {token}).then(out => {
      return out;
    });
  }
  get() {
    const token = Cookies.get('token');
    return this.client.legalizeGet(this.req, {token}).then(out => {
      return out;
    });
  } */
  check() {
    return this.client.legalizeCheck(this.req, {}).then(out => {
      return out;
    });
  }
  /* reject() {
    const token = Cookies.get('token');
    return this.client.legalizeRejected(this.req, {token}).then(out => {
      return out;
    });
  }
  verify() {
    const token = Cookies.get('token');
    return this.client.legalizeVerified(this.req, {token}).then(out => {
      return out;
    });
  }
  approve() {
    const token = Cookies.get('token');
    return this.client.legalizeApproved(this.req, {token}).then(out => {
      return out;
    });
  }
  done() {
    const token = Cookies.get('token');
    return this.client.legalizeDone(this.req, {token}).then(out => {
      return out;
    });
  }
  extend() {
    const token = Cookies.get('token');
    return this.client.legalizeExtended(this.req, {token}).then(out => {
      return out;
    });
  } */
}
