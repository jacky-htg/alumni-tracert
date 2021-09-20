import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, Legalize) {
    super(proto);
    this.req = Legalize;
  }
  create(token) {
    return this.client.legalizeUpload(this.req, {token}).then(out => {
      return out;
    });
  }
  getOwn(token) {
    return this.client.legalizeGetOwn(this.req, {token}).then(out => {
      return out;
    });
  }
  rating(token) {
    return this.client.legalizeRating(this.req, {token}).then(out => {
      return out;
    });
  }
  get(token) {
    return this.client.legalizeGet(this.req, {token}).then(out => {
      return out;
    });
  }
  check() {
    return this.client.legalizeCheck(this.req, {}).then(out => {
      return out;
    });
  }
  reject(token) {
    return this.client.legalizeRejected(this.req, {token}).then(out => {
      return out;
    });
  }
  verify(token) {
    return this.client.legalizeVerified(this.req, {token}).then(out => {
      return out;
    });
  }
  approve(token) {
    return this.client.legalizeApproved(this.req, {token}).then(out => {
      return out;
    });
  }
  done(token) {
    return this.client.legalizeDone(this.req, {token}).then(out => {
      return out;
    });
  }
}
