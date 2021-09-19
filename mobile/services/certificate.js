import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, user) {
    super(proto);
    this.req = user;
  }
  create() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client
      .certificateCreate(this.req, {token})
      .then(certificate => {
        return certificate;
      });
  }
}
