import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, alumniregistrationInput) {
    super(proto);
    this.req = alumniregistrationInput;
  }
  registration() {
    return this.client.alumniRegistration(this.req, {}).then(alumni => {
      return alumni;
    });
  }
  get() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client.alumniGet(this.req, {token}).then(alumni => {
      return alumni;
    });
  }
}
