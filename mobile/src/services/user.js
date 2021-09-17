import Tracert from './tracert';
// import Cookies from 'js-cookie';

export default class extends Tracert {
  constructor(proto, user) {
    super(proto);
    this.req = user;
  }
  create() {
    return this.client.userCreate(this.req, {}).then(user => {
      return user;
    });
  }
  /* getLastTrace() {
    const token = Cookies.get('token');
    return this.client.getLastTrace(this.req, {token}).then(user => {
      return user;
    });
  } */
}
