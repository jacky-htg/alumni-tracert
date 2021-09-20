import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, user) {
    super(proto);
    this.req = user;
  }
  create(token) {
    return this.client
      .certificateCreate(this.req, {token})
      .then(certificate => {
        return certificate;
      });
  }
}
