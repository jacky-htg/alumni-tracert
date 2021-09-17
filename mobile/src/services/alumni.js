import Tracert from './tracert';
// import Cookies from 'js-cookie';

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
  /* get() {
    const token = Cookies.get('token');
    return this.client.alumniGet(this.req, {token}).then(alumni => {
      return alumni;
    });
  } */
}
