import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, loginInput) {
    super(proto);
    this.req = loginInput;
  }
  login() {
    return this.client.login(this.req, {}).then(user => {
      console.log('buku', user);
      return user;
    });
  }
}
