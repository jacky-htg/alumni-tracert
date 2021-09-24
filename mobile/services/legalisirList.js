import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, legalisirListInput) {
    super(proto);
    this.req = legalisirListInput;
  }
  legalizeList(token) {
    return this.client.legalizeList(this.req, {token});
  }
}
