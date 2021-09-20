import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, UserAnswer) {
    super(proto);
    this.req = UserAnswer;
  }
  answer(token) {
    return this.client.userAnswerCreate(this.req, {token}).then(userAnswer => {
      return userAnswer;
    });
  }
  list(token) {
    return this.client.getTrace(this.req, {token});
  }
  tracer(token) {
    return this.client.tracerCreate(this.req, {token}).then(createdTracer => {
      return createdTracer;
    });
  }
}
