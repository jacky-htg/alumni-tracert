import Tracert from './tracert';

export default class extends Tracert {
  constructor(proto, appraiserRegistrationInput) {
    super(proto);
    this.req = appraiserRegistrationInput;
  }
  registration(token) {
    return this.client
      .alumniAppraiserCreate(this.req, {token})
      .then(appraiser => {
        return appraiser;
      });
  }
  get(token) {
    return this.client.alumniAppraiserGet(this.req, {token}).then(appraiser => {
      return appraiser;
    });
  }
}
