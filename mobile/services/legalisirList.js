import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, legalisirListInput) {
    super(proto);
    this.req = legalisirListInput;
  }
  legalizeList() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client.legalizeList(this.req, {token});
  }
}
