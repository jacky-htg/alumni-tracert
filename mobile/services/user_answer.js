import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, UserAnswer) {
    super(proto);
    this.req = UserAnswer;
  }
  answer() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client.userAnswerCreate(this.req, {token}).then(userAnswer => {
      return userAnswer;
    });
  }
  list() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client.getTrace(this.req, {token});
  }
  tracer() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpamFsLmFzZXAubnVncm9ob0BnbWFpbC5jb20iLCJleHAiOjE2MzIwMTIxODF9.DsRXymYEmO819X1j_XYD-UaVP7opyofqC4JGNwS1JmE';
    return this.client.tracerCreate(this.req, {token}).then(createdTracer => {
      return createdTracer;
    });
  }
}
