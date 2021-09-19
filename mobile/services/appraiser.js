import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, appraiserRegistrationInput) {
    super(proto);
    this.req = appraiserRegistrationInput;
  }
  registration() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client
      .alumniAppraiserCreate(this.req, {token})
      .then(appraiser => {
        return appraiser;
      });
  }
  get() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client.alumniAppraiserGet(this.req, {token}).then(appraiser => {
      return appraiser;
    });
  }
}
